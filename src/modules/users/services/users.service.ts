import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import * as User from "../"
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class UserService {
    constructor(
        private userRepository: User.UserRepository,
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async getUserEntity(userId: number) {
        return this.userRepository.findUserById(userId);
    }

    async getUser(userId: number) {
        this.logger.log(`GetUser request received for userId: ${userId}`);

        let user = await this.getUserEntity(userId);
        if (!user) {
            this.logger.warn(`GetUser failed. User not found: ${userId}`);
            throw new NotFoundException('User not found');
        }

        this.logger.log(`User found successfully (ID: ${userId}, Email: ${user.email})`);

        return {
            success: true,
            statusCode: 200,
            message: 'successfully',
            data: {
                user
            }
        };
    }
}