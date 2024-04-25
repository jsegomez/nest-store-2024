import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, MaxLength, MinLength, minLength } from "class-validator";

export class CreateProdcutDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty({description: "name of product"})
    readonly name: string;

    @IsString()
    @ApiProperty({description: "Description product"})
    readonly description: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({description: "Price of product"})
    readonly price: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({description: "Stock"})
    readonly stock: number;

    @IsBoolean()
    @ApiProperty({description: "Is avaliable"})
    readonly avaliable: boolean;

    @IsUrl()
    @ApiProperty({description: "url image"})
    readonly image: string
}

export class UpdateProductDTO extends PartialType(CreateProdcutDTO){}