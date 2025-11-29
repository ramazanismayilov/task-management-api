import { Repository } from "typeorm";
import * as User from "../../users";
export declare class UserRepository {
    private readonly userRepo;
    private readonly userActivationRepo;
    constructor(userRepo: Repository<User.UserEntity>, userActivationRepo: Repository<User.UserActivationEntity>);
    findUserByEmail(email: string): Promise<User.UserEntity | null>;
    findUserById(id: number): Promise<User.UserEntity | null>;
    findUserByRefreshToken(refreshToken: string): Promise<User.UserEntity | null>;
    createUser(user: Partial<User.UserEntity>): User.UserEntity;
    saveUser(user: User.UserEntity): Promise<User.UserEntity>;
    updateUserOtpVerified(userId: number, otpCode: number, now: Date): Promise<import("typeorm").UpdateResult>;
    findActiveActivation(userId: number): Promise<User.UserActivationEntity | null>;
    createActivation(data: Partial<User.UserActivationEntity>): User.UserActivationEntity;
    saveActivation(activation: User.UserActivationEntity): Promise<User.UserActivationEntity>;
    findUserActivation(userId: number, expiredAt: Date): Promise<User.UserActivationEntity | null>;
    findValidToken(token: string): Promise<User.UserActivationEntity | null>;
    deleteActivationByUserId(userId: number): Promise<import("typeorm").DeleteResult>;
    findUserByIdWithPassword(id: number): Promise<User.UserEntity | null>;
}
