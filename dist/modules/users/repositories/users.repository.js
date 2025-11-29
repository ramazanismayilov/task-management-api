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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User = require("../../users");
let UserRepository = class UserRepository {
    constructor(userRepo, userActivationRepo) {
        this.userRepo = userRepo;
        this.userActivationRepo = userActivationRepo;
    }
    async findUserByEmail(email) {
        return this.userRepo.findOne({ where: { email } });
    }
    async findUserById(id) {
        return this.userRepo.findOne({ where: { id }, relations: ['role'] });
    }
    async findUserByRefreshToken(refreshToken) {
        return this.userRepo.findOne({ where: { refreshToken } });
    }
    createUser(user) {
        return this.userRepo.create(user);
    }
    async saveUser(user) {
        return this.userRepo.save(user);
    }
    async updateUserOtpVerified(userId, otpCode, now) {
        return this.userRepo.update({ id: userId, otpCode, otpExpiredAt: (0, typeorm_2.MoreThan)(now) }, { isActive: true, otpCode: null, otpExpiredAt: null });
    }
    async findActiveActivation(userId) {
        return this.userActivationRepo.findOne({ where: { userId, expiredAt: (0, typeorm_2.MoreThan)(new Date()) } });
    }
    createActivation(data) {
        return this.userActivationRepo.create(data);
    }
    async saveActivation(activation) {
        return this.userActivationRepo.save(activation);
    }
    async findUserActivation(userId, expiredAt) {
        return this.userActivationRepo.findOne({ where: { userId, expiredAt } });
    }
    async findValidToken(token) {
        return this.userActivationRepo.findOne({ where: { token, expiredAt: (0, typeorm_2.MoreThan)(new Date()) } });
    }
    async deleteActivationByUserId(userId) {
        return this.userActivationRepo.delete({ userId });
    }
    async findUserByIdWithPassword(id) {
        return this.userRepo.findOne({ where: { id }, select: ['id', 'email', 'password'] });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(User.UserActivationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserRepository);
//# sourceMappingURL=users.repository.js.map