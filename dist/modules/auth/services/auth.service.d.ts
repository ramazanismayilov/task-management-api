import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { Repository } from "typeorm";
import * as Auth from "../";
import * as User from "../../users";
import * as Role from "../../roles";
export declare class AuthService {
    private jwt;
    private cls;
    private mailer;
    private userRepository;
    private roleRepo;
    constructor(jwt: JwtService, cls: ClsService, mailer: MailerService, userRepository: User.UserRepository, roleRepo: Repository<Role.RoleEntity>);
    login(params: Auth.LoginDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
            userId: number;
            accessToken: string;
            refreshToken: string;
        };
    }>;
    register(params: Auth.RegisterDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
            userId: number;
        };
    }>;
    firebase(): Promise<void>;
    verifyOtp(params: Auth.VerifyOtpDto): Promise<{
        status: boolean;
        statusCode: number;
        message: string;
        data: {
            userId: number;
        };
    }>;
    resendOtp(params: Auth.ResendOtpDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
    }>;
    refreshToken(params: Auth.RefreshTokenDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
            accessToken: string;
        };
    }>;
    resetPassword(params: Auth.ResetPasswordDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
    }>;
    createForgetPasswordRequest(params: Auth.CreateForgetPasswordDto): Promise<{
        message: string;
    }>;
    confirmForgetPassword(params: Auth.ConfirmForgetPaswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyToken(token: string): {
        success: boolean;
        statusCode: number;
        message: string;
        userId: any;
    };
}
