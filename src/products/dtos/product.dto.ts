import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateProdcutDTO{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsPositive()
    readonly price: number;

    @IsString()
    readonly description: string;

    @IsNumber()
    @IsPositive()
    readonly stock: number;

    @IsBoolean()
    readonly avaliable: boolean;

    @IsUrl()
    readonly url: string
}

export class UpdateProductDTO extends PartialType(CreateProdcutDTO){}