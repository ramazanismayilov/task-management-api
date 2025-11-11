import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { v4 } from 'uuid'
import { MailerService } from "@nestjs-modules/mailer";
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
        const hashedRefresh = await bcrypt.hash(refreshToken, 10);
        const refreshTokenDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        user.refreshToken = hashedRefresh;
        user.refreshTokenDate = refreshTokenDate;

        await this.userRepository.saveUser(user);

        this.logger.log(`Login successful for email: ${params.email}`);

        return {
            success: true,
            statusCode: 200,
            message: 'Login is successfully',
            data: {
                accessToken,
                refreshToken: hashedRefresh
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

    async refreshToken() { }

    async resendOtp() { }

    async resetPassword() { }

    async createForgetPasswordRequest() { }

    async confirmForgetPassword() { }

    async verifyToken() { }
}