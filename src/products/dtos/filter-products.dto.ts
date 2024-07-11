import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength, ValidateIf } from "class-validator";

export class FilterProductsDTO{
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()    
    readonly limit: number;

    @IsNumber()    
    @IsNotEmpty()        
    readonly page: number;
    
    @Min(0)    
    @Optional()
    minPrice: number = 0.0001;
   
    @IsPositive()
    @ValidateIf( (params) => params.minPrice)
    maxPrice: number = 100000;

    @IsOptional()
    @MinLength(2)
    @IsString()
    name: string;
}


