import * as User from "../";
export declare class UserService {
    private userRepository;
    constructor(userRepository: User.UserRepository);
    getUserEntity(userId: number): Promise<User.UserEntity | null>;
    getUser(userId: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
            user: User.UserEntity;
        };
    }>;
}
