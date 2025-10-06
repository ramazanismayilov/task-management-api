import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @Length(6, 12, { message: 'Password must be between 6 and 32 characters' })
    @IsNotEmpty()
    password: string;
}