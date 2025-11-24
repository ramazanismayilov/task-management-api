import { IsEmail, IsString } from 'class-validator';

export class CreateForgetPasswordDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    callbackURL: string = 'http://localhost:3000/forget-password.html';
}