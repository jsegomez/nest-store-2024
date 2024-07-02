import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly lastname: string;

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

export class UpdateUserDTO extends PartialType(CreateUserDTO){}