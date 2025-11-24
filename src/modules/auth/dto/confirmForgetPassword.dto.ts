import { IsString, IsUUID, Length } from 'class-validator';

export class ConfirmForgetPaswordDto {
    @IsString()
    @IsUUID()
    token: string;

    @IsString()
    @Length(6, 12)
    newPassword: string;

    @IsString()
    @Length(6, 12)
    repeatPassword: string;
}