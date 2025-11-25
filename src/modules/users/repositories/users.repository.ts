import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import * as User from "../../users"

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User.UserEntity)
        private readonly userRepo: Repository<User.UserEntity>,
        @InjectRepository(User.UserActivationEntity)
        private readonly userActivationRepo: Repository<User.UserActivationEntity>,
    ) { }

    async findUserByEmail(email: string) {
        return this.userRepo.findOne({ where: { email } })
    }

    async findUserById(id: number) {
        return this.userRepo.findOne({ where: { id }, relations: ['role'] })
    }

    async findUserByRefreshToken(refreshToken: string) {
        return this.userRepo.findOne({ where: { refreshToken } })
    }

    createUser(user: Partial<User.UserEntity>) {
        return this.userRepo.create(user);
    }

    async saveUser(user: User.UserEntity) {
        return this.userRepo.save(user);
    }

    async updateUserOtpVerified(userId: number, otpCode: number, now: Date) {
        return this.userRepo.update(
            { id: userId, otpCode, otpExpiredAt: MoreThan(now) },
            { isActive: true, otpCode: null, otpExpiredAt: null }
        );
    }

    async findActiveActivation(userId: number) {
        return this.userActivationRepo.findOne({ where: { userId, expiredAt: MoreThan(new Date()) } })
    }

    createActivation(data: Partial<User.UserActivationEntity>) {
        return this.userActivationRepo.create(data);
    }

    async saveActivation(activation: User.UserActivationEntity) {
        return this.userActivationRepo.save(activation);
    }

    async findUserActivation(userId: number, expiredAt: Date) {
        return this.userActivationRepo.findOne({ where: { userId, expiredAt } });
    }

    async findValidToken(token: string) {
        return this.userActivationRepo.findOne({ where: { token, expiredAt: MoreThan(new Date()) } });
    }

    async deleteActivationByUserId(userId: number) {
        return this.userActivationRepo.delete({ userId });
    }

    async findUserByIdWithPassword(id: number) {
        return this.userRepo.findOne({ where: { id }, select: ['id', 'email', 'password'] });
    }
}