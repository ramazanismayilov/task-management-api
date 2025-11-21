import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import * as User from "../../users"

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User.UserEntity)
        private readonly repo: Repository<User.UserEntity>,
    ) { }

    async findUserByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    async findUserByRefreshToken(refreshToken: string) {
        return this.repo.findOne({ where: { refreshToken } });
    }

    createUser(user: Partial<User.UserEntity>) {
        return this.repo.create(user);
    }

    async saveUser(user: User.UserEntity) {
        return this.repo.save(user);
    }

    async updateUserOtpVerified(userId: number, otpCode: number, now: Date) {
        return this.repo.update(
            { id: userId, otpCode, otpExpiredAt: MoreThan(now) },
            { isActive: true, otpCode: null, otpExpiredAt: null }
        );
    }
}
