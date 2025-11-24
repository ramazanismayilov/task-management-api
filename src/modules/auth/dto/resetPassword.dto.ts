import { IsString, Length } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    currentPassword: string;

    @IsString()
    @Length(6, 12, { message: 'Password must be between 6 and 32 characters' })
    newPassword: string;

    @IsString()
    @Length(6, 12, { message: 'Password must be between 6 and 32 characters' })
    repeatPassword: string;
}