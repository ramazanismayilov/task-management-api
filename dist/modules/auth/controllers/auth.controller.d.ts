import * as Auth from "../";
export declare class AuthController {
    private authService;
    constructor(authService: Auth.AuthService);
    login(body: Auth.LoginDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
            userId: number;
            accessToken: string;
            refreshToken: string;
        };
    }>;
    register(body: Auth.RegisterDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
            userId: number;
        };
    }>;
    verifyOtp(body: Auth.VerifyOtpDto): Promise<{
        status: boolean;
        statusCode: number;
        message: string;
        data: {
            userId: number;
        };
    }>;
    resendOtp(body: Auth.ResendOtpDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
    }>;
    refreshToken(body: Auth.RefreshTokenDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
            accessToken: string;
        };
    }>;
    resetPassword(body: Auth.ResetPasswordDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
    }>;
    createForgetPasswordRequest(body: Auth.CreateForgetPasswordDto): Promise<{
        message: string;
    }>;
    confirmPassword(body: Auth.ConfirmForgetPaswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    verify(token: string): {
        success: boolean;
        statusCode: number;
        message: string;
        userId: any;
    };
}
