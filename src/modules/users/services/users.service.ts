import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import * as User from "../"

@Injectable()
export class UserService {
    constructor(
        private userRepository: User.UserRepository,
    ) { }

    async getUserEntity(userId: number) {
        return this.userRepository.findUserById(userId);
    }

    async getUser(userId: number) {
        let user = await this.getUserEntity(userId);
        if (!user) throw new NotFoundException('User not found');

        return {
            success: true,
            statusCode: 200,
            message: 'success',
            data: {
                user
            }
        };
    }
}