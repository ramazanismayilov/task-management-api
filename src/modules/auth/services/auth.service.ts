import { ConflictException, ForbiddenException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { RoleEntity } from "../../../modules/roles/entities/role.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "../../../common/enums/role.enum";
import { generateOtpExpireDate, generateOtpNumber } from "../../../common/utils/otp.utils";
import { UserRepository } from "../../../modules/users/repositories/users.repository";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { v4 } from 'uuid'


@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private cls: ClsService,
        private userRepository: UserRepository,
        @InjectRepository(RoleEntity)
        private roleRepo: Repository<RoleEntity>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    ) { }

    async login(params: LoginDto) {
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

    async register(params: RegisterDto) {
        this.logger.log(`Register attempt for email: ${params.email}`);

        const existingUser = await this.userRepository.findUserByEmail(params.email);
        if (existingUser) {
            this.logger.warn(`Register failed. User already exists: ${params.email}`);
            throw new ConflictException(`User already exists with email: ${params.email}`);
        }

        const hashedPassword = await bcrypt.hash(params.password, 10);

        const userRole = await this.roleRepo.findOne({ where: { name: Role.USER } });
        if (!userRole) {
            this.logger.error(`Role not found: ${Role.USER}`);
            throw new ConflictException(`Role not found: ${Role.USER}`);
        }

        const user = this.userRepository.createUser({
            email: params.email,
            password: hashedPassword,
            role: userRole,
            isActive: false,
            otpCode: generateOtpNumber(),
            otpExpiredAt: generateOtpExpireDate(),
            profile: { fullName: params.fullName } as any,
        });

        await this.userRepository.saveUser(user);

        this.logger.log(`User created successfully (email: ${params.email}, id: ${user.id})`);

        return {
            success: true,
            statusCode: 201,
            message: 'OTP sent to your email',
        };
    }

    async firebase() { }

    async verifyOtp() { }

    async refreshToken() { }

    async resendOtp() { }

    async resetPassword() { }

    async createForgetPasswordRequest() { }

    async confirmForgetPassword() { }
    
    async verifyToken() { }
}