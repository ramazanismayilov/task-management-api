import { Body, Controller, Post } from "@nestjs/common";
import * as Auth from "../"

@Controller('auth')
export class AuthController {
    constructor(private authService: Auth.AuthService) { }

    @Post('login')
    login(@Body() body: Auth.LoginDto) {
        return this.authService.login(body)
    }

    @Post('register')
    register(@Body() body: Auth.RegisterDto) {
        return this.authService.register(body)
    }

    @Post('verifyOtp')
    verifyOtp(@Body() body: Auth.VerifyOtpDto) {
        return this.authService.verifyOtp(body)
    }
}