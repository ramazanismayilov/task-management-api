import { ConflictException, Inject, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { RoleEntity } from "src/modules/roles/entities/role.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "src/common/enums/role.enum";
import { generateOtpExpireDate, generateOtpNumber } from "src/common/utils/otp.utils";
import { UserRepository } from "src/modules/users/repositories/users.repository";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { RegisterDto } from "../dto/register.dto";


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

    async login() { }

    async register(params: RegisterDto) {
        this.logger.log(`Register attempt for email: ${params.email}`);
        const existingUser = await this.userRepository.findUserByEmail(params.email);
        if (existingUser) {
            this.logger.warn(`User already exists with email: ${params.email}`);
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(params.password, 10);

        const userRole = await this.roleRepo.findOne({ where: { name: Role.USER } });
        if (!userRole) {
            this.logger.error(`Role not found: ${Role.USER}`);
            throw new ConflictException('Role not found');
        }

        const user = this.userRepository.createUser({
            email: params.email,
            password: hashedPassword,
            role: userRole,
            isActive: false,
            otpCode: generateOtpNumber(),
            otpExpiredAt: generateOtpExpireDate(),
            profile: {
                fullName: params.fullName
            } as any
        });

        await this.userRepository.saveUser(user);

        this.logger.log(`User created successfully (email: ${params.email}, id: ${user.id})`);

        return { message: 'OTP sent to your email.' };
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