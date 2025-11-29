"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const nestjs_cls_1 = require("nestjs-cls");
const date_fns_1 = require("date-fns");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const User = require("../../users");
const Role = require("../../roles");
const Enum = require("../../../common/enums");
const Utils = require("../../../common/utils");
let AuthService = class AuthService {
    constructor(jwt, cls, mailer, userRepository, roleRepo) {
        this.jwt = jwt;
        this.cls = cls;
        this.mailer = mailer;
        this.userRepository = userRepository;
        this.roleRepo = roleRepo;
    }
    async login(params) {
        const user = await this.userRepository.findUserByEmail(params.email);
        if (!user)
            throw new common_1.NotFoundException('Email or passsword is wrong');
        if (!user.isActive)
            throw new common_1.ForbiddenException('Account is not active');
        let isPasswordValid = await bcrypt.compare(params.password, user.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Email or passsword is wrong');
        let accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' });
        const refreshToken = (0, uuid_1.v4)();
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
        };
    }
    async register(params) {
        const existingUser = await this.userRepository.findUserByEmail(params.email);
        if (existingUser)
            throw new common_1.ConflictException(`User already exists with email: ${params.email}`);
        const hashedPassword = await bcrypt.hash(params.password, 10);
        const userRole = await this.roleRepo.findOne({ where: { name: Enum.Role.USER } });
        if (!userRole)
            throw new common_1.ConflictException(`Role not found: ${Enum.Role.USER}`);
        const user = this.userRepository.createUser({
            email: params.email,
            password: hashedPassword,
            role: userRole,
            isActive: false,
            otpCode: Utils.generateOtpNumber(),
            otpExpiredAt: Utils.generateOtpExpireDate(),
            profile: { fullName: params.fullName },
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
    async verifyOtp(params) {
        const user = await this.userRepository.findUserByEmail(params.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.isActive)
            throw new common_1.BadRequestException('Account is already active');
        if (!user.otpCode ||
            !user.otpExpiredAt ||
            user.otpCode !== params.otpCode ||
            new Date().getTime() > user.otpExpiredAt.getTime())
            throw new common_1.BadRequestException('OTP is incorrect or expired.');
        const result = await this.userRepository.updateUserOtpVerified(user.id, params.otpCode, new Date());
        if (result.affected === 0)
            throw new common_1.BadRequestException('OTP is incorrect or expired.');
        return {
            status: true,
            statusCode: 200,
            message: 'Account successfully activated',
            data: {
                userId: user.id
            }
        };
    }
    async resendOtp(params) {
        const user = await this.userRepository.findUserByEmail(params.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.isActive)
            throw new common_1.BadRequestException('Account is already active');
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
    async refreshToken(params) {
        const user = await this.userRepository.findUserByRefreshToken(params.refreshToken);
        if (!user)
            throw new common_1.NotFoundException('Refresh token is invalid');
        const accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' });
        return {
            success: true,
            statusCode: 200,
            message: 'success',
            data: {
                accessToken
            }
        };
    }
    async resetPassword(params) {
        const user = this.cls.get('user');
        if (!user)
            throw new common_1.UnauthorizedException('Unauthorized');
        const checkPassword = await bcrypt.compare(params.currentPassword, user.password);
        if (!checkPassword)
            throw new common_1.BadRequestException('Current password is wrong');
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
    async createForgetPasswordRequest(params) {
        const user = await this.userRepository.findUserByEmail(params.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        let activation = await this.userRepository.findActiveActivation(user.id);
        if (!activation) {
            activation = this.userRepository.createActivation({
                userId: user.id,
                token: (0, uuid_1.v4)(),
                expiredAt: (0, date_fns_1.addMinutes)(new Date(), 30),
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Due to some reasons, we cannot send mail for forgot-password');
        }
    }
    async confirmForgetPassword(params) {
        const activation = await this.userRepository.findValidToken(params.token);
        if (!activation)
            throw new common_1.BadRequestException('Token is not valid');
        Utils.validatePasswords(params.newPassword, params.repeatPassword);
        const user = await this.userRepository.findUserByIdWithPassword(activation.userId);
        if (!user)
            throw new common_1.NotFoundException('User is not found');
        const hashedPassword = await bcrypt.hash(params.newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.saveUser(user);
        await this.userRepository.deleteActivationByUserId(user.id);
        return {
            success: true,
            message: 'Password is updated successfully',
        };
    }
    verifyToken(token) {
        try {
            const payload = this.jwt.verify(token);
            return {
                success: true,
                statusCode: 200,
                message: "Success",
                userId: payload.userId
            };
        }
        catch (e) {
            if (e.name === 'JsonWebTokenError')
                throw new common_1.BadRequestException("Invalid or expired token");
            if (e.name === 'TokenExpiredError')
                throw new common_1.BadRequestException("Token has expired");
            throw new common_1.InternalServerErrorException(`Verification failed: ${e}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectRepository)(Role.RoleEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        nestjs_cls_1.ClsService,
        mailer_1.MailerService, User.UserRepository, typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map