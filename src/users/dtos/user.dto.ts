import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO{
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly role: string;
}