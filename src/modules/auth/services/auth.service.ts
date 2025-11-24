import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { MailerService } from "@nestjs-modules/mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
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
        private roleRepo: Repository<Role.RoleEntity>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    ) { }

    async login(params: Auth.LoginDto) {
        this.logger.log(`Login attempt for email: ${params.email}`);
        const user = await this.userRepository.findUserByEmail(params.email)
        if (!user) {
            this.logger.warn(`Login failed. User not found: ${params.email}`);
            throw new NotFoundException('Email or passsword is wrong')
        }

        if (!user.isActive) {
            this.logger.warn(`Login failed. Account not active: ${params.email}`);
            throw new ForbiddenException('Account is not active');
        }

        let isPasswordValid = await bcrypt.compare(params.password, user.password);
        if (!isPasswordValid) {
            this.logger.warn(`Login failed. Invalid password for email: ${params.email}`);
            throw new UnauthorizedException('Email or passsword is wrong');
        }

        let accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' });
        const refreshToken = v4()
        const refreshTokenDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        user.refreshToken = refreshToken;
        user.refreshTokenDate = refreshTokenDate;

        await this.userRepository.saveUser(user);

        this.logger.log(`Login successful for email: ${params.email}`);

        return {
            success: true,
            statusCode: 200,
            message: 'Login is successfully',
            data: {
                accessToken,
                refreshToken: refreshToken
            }
        }
    }

    async register(params: Auth.RegisterDto) {
        this.logger.log(`Register attempt for email: ${params.email}`);

        const existingUser = await this.userRepository.findUserByEmail(params.email);
        if (existingUser) {
            this.logger.warn(`Register failed. User already exists: ${params.email}`);
            throw new ConflictException(`User already exists with email: ${params.email}`);
        }

        const hashedPassword = await bcrypt.hash(params.password, 10);

        const userRole = await this.roleRepo.findOne({ where: { name: Enum.Role.USER } });
        if (!userRole) {
            this.logger.error(`Role not found: ${Enum.Role.USER}`);
            throw new ConflictException(`Role not found: ${Enum.Role.USER}`);
        }

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

        this.logger.log(`User created successfully (email: ${params.email}, id: ${user.id})`);

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

    async firebase() { }

    async verifyOtp(params: Auth.VerifyOtpDto) {
        this.logger.log(`VerifyOtp attempt for email: ${params.email}`);

        const user = await this.userRepository.findUserByEmail(params.email);
        if (!user) {
            this.logger.warn(`VerifyOtp failed. User not found: ${params.email}`);
            throw new NotFoundException('User not found');
        }

        if (user.isActive) {
            this.logger.warn(`VerifyOtp failed. Account is already active: ${params.email}`);
            throw new BadRequestException('Account is already active');
        }

        if (!user.otpCode || !user.otpExpiredAt || user.otpCode !== params.otpCode || new Date().getTime() > user.otpExpiredAt.getTime()) {
            this.logger.warn(`VerifyOtp failed. OTP is incorrect or expired: ${params.email}`);
            throw new BadRequestException('OTP is incorrect or expired.');
        }

        const result = await this.userRepository.updateUserOtpVerified(user.id, params.otpCode, new Date());

        if (result.affected === 0) {
            this.logger.warn(`VerifyOtp failed. OTP already used or expired: ${params.email}`);
            throw new BadRequestException('OTP is incorrect or expired.');
        }

        this.logger.log(`VerifyOtp successful for email: ${params.email}`);
        return {
            status: true,
            statusCode: 200,
            message: 'Account successfully activated',
        };
    }

    async resendOtp(params: Auth.ResendOtpDto) {
        this.logger.log(`Resend OTP attempt for email: ${params.email}`);

        const user = await this.userRepository.findUserByEmail(params.email);

        if (!user) {
            this.logger.warn(`ResendOtp failed. User not found: ${params.email}`);
            throw new NotFoundException('User not found');
        }

        if (user.isActive) {
            this.logger.warn(`ResendOtp failed. Account is already active: ${params.email}`);
            throw new BadRequestException('Account is already active');
        }

        user.otpCode = Utils.generateOtpNumber();
        user.otpExpiredAt = Utils.generateOtpExpireDate();

        this.logger.debug(`New OTP generated for ${params.email}: ${user.otpCode}`);

        await this.userRepository.saveUser(user);
        this.logger.log(`Updated OTP saved to DB for ${params.email}`);


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

        this.logger.log(`OTP email sent to ${params.email}`);

        return {
            success: true,
            statusCode: 201,
            message: 'OTP sent to your email',
        };
    }

    async refreshToken(params: Auth.RefreshTokenDto) {
        this.logger.log(`Refresh token request received`);

        const user = await this.userRepository.findUserByRefreshToken(params.refreshToken)
        if (!user) {
            this.logger.warn(`Refresh token failed. User not found for token: ${params.refreshToken}`)
            throw new NotFoundException('Refresh token is invalid');
        }

        this.logger.debug(`User found for refresh token: ${user.email}`);

        const accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' })

        this.logger.log(`New access token generated for user: ${user.email}`)

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
        this.logger.log(`Password reset attempt for user`);

        const user = this.cls.get<User.UserEntity>('user');
        if (!user) {
            this.logger.error(`resetPassword failed: No user found in CLS context`);
            throw new UnauthorizedException('Unauthorized');
        }

        this.logger.debug(`User found for resetPassword: ${user.email}`);

        const checkPassword = await bcrypt.compare(params.currentPassword, user.password);

        if (!checkPassword) {
            this.logger.warn(`resetPassword failed: Current password is incorrect for user ${user.email}`);
            throw new BadRequestException('Current password is wrong');
        }

        this.logger.debug(`Current password validated for user ${user.email}`);

        Utils.validatePasswords(params.newPassword, params.repeatPassword);

        this.logger.debug(`New passwords validated successfully for ${user.email}`);

        const hashedPassword = await bcrypt.hash(params.newPassword, 10);
        user.password = hashedPassword;

        this.logger.log(`New password hashed for user ${user.email}`);

        await this.userRepository.saveUser(user);

        this.logger.log(`Password updated successfully for user ${user.email}`);

        return {
            success: true,
            statusCode: 200,
            message: 'Password is updated successfully',
        };
    }

    async createForgetPasswordRequest(params: Auth.CreateForgetPasswordDto) { }

    async confirmForgetPassword(params: Auth.ConfirmForgetPaswordDto) { }

    verifyToken(token: string) {
        this.logger.log(`Received verify token request. Token: ${token}`);

        try {
            const payload = this.jwt.verify(token);
            this.logger.log(`Token verified successfully. Payload: ${JSON.stringify(payload)}`);

            return {
                success: true,
                statusCode: 200,
                message: "Success",
                userId: payload.userId
            };

        } catch (e: any) {
            this.logger.error(`Token verification failed. Error: ${e.name} - ${e.message}`);

            if (e.name === 'JsonWebTokenError')  throw new BadRequestException("Invalid or expired token")
            if (e.name === 'TokenExpiredError') throw new BadRequestException("Token has expired");

            throw new InternalServerErrorException(`Verification failed: ${e}`);
        }
    }
}