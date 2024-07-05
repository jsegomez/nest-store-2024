import { PartialType } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { PetDto } from "./pet.dto";
import { Type } from "class-transformer";

export class CreateCustomerDto{
    @IsString()
    @MinLength(2)
    readonly name: string;

    @IsString()
    @MinLength(2)
    readonly lastname: string;

    @IsPhoneNumber("SV")
    readonly phone: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PetDto)
    readonly pets: PetDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto){}


