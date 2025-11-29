import * as User from "../";
export declare class UserController {
    private userService;
    constructor(userService: User.UserService);
    getUser(id: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
            user: User.UserEntity;
        };
    }>;
}
