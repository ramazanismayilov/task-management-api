import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { addMinutes } from "date-fns";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid'
import * as Auth from "../"
import * as User from "../../users"
import * as Role from "../../roles"
import * as Enum from "../../../common/enums"
import * as Utils from "../../../common/utils"


@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private cls: ClsService,
        private mailer: MailerService,
        private userRepository: User.UserRepository,
        @InjectRepository(Role.RoleEntity)
        private roleRepo: Repository<Role.RoleEntity>
    ) { }

    async login(params: Auth.LoginDto) {
        const user = await this.userRepository.findUserByEmail(params.email)
        if (!user) throw new NotFoundException('Email or passsword is wrong')
        if (!user.isActive) throw new ForbiddenException('Account is not active');

        let isPasswordValid = await bcrypt.compare(params.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Email or passsword is wrong');

        let accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' });
        const refreshToken = v4()
        const refreshTokenDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        user.refreshToken = refreshToken;
        user.refreshTokenDate = refreshTokenDate;

        await this.userRepository.saveUser(user);
        return {
            success: true,
            statusCode: 200,
            message: 'Login is successfully',
            data: {
                userId: user.id,
                accessToken,
                refreshToken: refreshToken
            }
        }
    }

    async register(params: Auth.RegisterDto) {
        const existingUser = await this.userRepository.findUserByEmail(params.email);
        if (existingUser) throw new ConflictException(`User already exists with email: ${params.email}`);

        const hashedPassword = await bcrypt.hash(params.password, 10);

        const userRole = await this.roleRepo.findOne({ where: { name: Enum.Role.USER } });
        if (!userRole) throw new ConflictException(`Role not found: ${Enum.Role.USER}`);

        const user = this.userRepository.createUser({
            email: params.email,
            password: hashedPassword,
            role: userRole,
            isActive: false,
            otpCode: Utils.generateOtpNumber(),
            otpExpiredAt: Utils.generateOtpExpireDate(),
            profile: { fullName: params.fullName } as any,
        });

        await this.userRepository.saveUser(user);

        if (params.email) {
            await this.mailer.sendMail({
                to: params.email,
                subject: 'Verify Your Email – TaskMaster!',
                template: 'verify-email',
                context: {
                    fullName: user.profile.fullName,
                    otpCode: user.otpCode,
                },
            });
        }

        return {
            success: true,
            statusCode: 201,
            message: 'OTP sent to your email',
            data: {
                userId: user.id
            }
        };
    }

    async firebase() { }

    async verifyOtp(params: Auth.VerifyOtpDto) {
        const user = await this.userRepository.findUserByEmail(params.email);
        if (!user) throw new NotFoundException('User not found');
        if (user.isActive) throw new BadRequestException('Account is already active');

        if (
            !user.otpCode ||
            !user.otpExpiredAt ||
            user.otpCode !== params.otpCode ||
            new Date().getTime() > user.otpExpiredAt.getTime()
        ) throw new BadRequestException('OTP is incorrect or expired.');

        const result = await this.userRepository.updateUserOtpVerified(user.id, params.otpCode, new Date());
        if (result.affected === 0) throw new BadRequestException('OTP is incorrect or expired.');

        return {
            status: true,
            statusCode: 200,
            message: 'Account successfully activated',
            data: {
                userId: user.id
            }
        };
    }

    async resendOtp(params: Auth.ResendOtpDto) {
        const user = await this.userRepository.findUserByEmail(params.email);
        if (!user) throw new NotFoundException('User not found');
        if (user.isActive) throw new BadRequestException('Account is already active');

        user.otpCode = Utils.generateOtpNumber();
        user.otpExpiredAt = Utils.generateOtpExpireDate();

        await this.userRepository.saveUser(user);

        if (params.email) {
            await this.mailer.sendMail({
                to: params.email,
                subject: 'Verify Your Email – TaskMaster!',
                template: 'verify-email',
                context: {
                    fullName: user.profile.fullName,
                    otpCode: user.otpCode,
                },
            });
        }

        return {
            success: true,
            statusCode: 201,
            message: 'OTP sent to your email',
        };
    }

    async refreshToken(params: Auth.RefreshTokenDto) {
        const user = await this.userRepository.findUserByRefreshToken(params.refreshToken)
        if (!user) throw new NotFoundException('Refresh token is invalid');

        const accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' })

        return {
            success: true,
            statusCode: 200,
            message: 'success',
            data: {
                accessToken
            }
        }
    }

    async resetPassword(params: Auth.ResetPasswordDto) {
        const user = this.cls.get<User.UserEntity>('user');
        if (!user) throw new UnauthorizedException('Unauthorized');

        const checkPassword = await bcrypt.compare(params.currentPassword, user.password);

        if (!checkPassword) throw new BadRequestException('Current password is wrong');

        Utils.validatePasswords(params.newPassword, params.repeatPassword);

        const hashedPassword = await bcrypt.hash(params.newPassword, 10);
        user.password = hashedPassword;

        await this.userRepository.saveUser(user);

        return {
            success: true,
            statusCode: 200,
            message: 'Password is updated successfully',
        };
    }

    async createForgetPasswordRequest(params: Auth.CreateForgetPasswordDto) {
        const user = await this.userRepository.findUserByEmail(params.email);
        if (!user) throw new NotFoundException('User not found');

        let activation = await this.userRepository.findActiveActivation(user.id);
        if (!activation) {
            activation = this.userRepository.createActivation({
                userId: user.id,
                token: v4(),
                expiredAt: addMinutes(new Date(), 30),
            });
        }

        const resetLink = `${params.callbackURL}?token=${activation.token}`;

        try {
            await this.mailer.sendMail({
                to: user.email,
                subject: 'Forgot Password Request - Epic Games!',
                template: 'forget-password',
                context: {
                    fullName: user.profile.fullName,
                    resetLink,
                },
            });

            await this.userRepository.saveActivation(activation);

            return { message: 'Mail has been successfully sent' };

        } catch (error) {
            throw new InternalServerErrorException('Due to some reasons, we cannot send mail for forgot-password')
        }
    }

    async confirmForgetPassword(params: Auth.ConfirmForgetPaswordDto) {
        const activation = await this.userRepository.findValidToken(params.token);
        if (!activation) throw new BadRequestException('Token is not valid');

        Utils.validatePasswords(params.newPassword, params.repeatPassword);

        const user = await this.userRepository.findUserByIdWithPassword(activation.userId);
        if (!user) throw new NotFoundException('User is not found');

        const hashedPassword = await bcrypt.hash(params.newPassword, 10);
        user.password = hashedPassword;

        await this.userRepository.saveUser(user);
        await this.userRepository.deleteActivationByUserId(user.id);

        return {
            success: true,
            message: 'Password is updated successfully',
        };
    }

    verifyToken(token: string) {
        try {
            const payload = this.jwt.verify(token);

            return {
                success: true,
                statusCode: 200,
                message: "Success",
                userId: payload.userId
            };

        } catch (e: any) {
            if (e.name === 'JsonWebTokenError') throw new BadRequestException("Invalid or expired token")
            if (e.name === 'TokenExpiredError') throw new BadRequestException("Token has expired");

            throw new InternalServerErrorException(`Verification failed: ${e}`);
        }
    }
}