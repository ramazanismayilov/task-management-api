import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
    ) { }

    async findUserByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    createUser(user: Partial<UserEntity>) {
        return this.repo.create(user);
    }

    async saveUser(user: UserEntity) {
        return this.repo.save(user);
    }
}
