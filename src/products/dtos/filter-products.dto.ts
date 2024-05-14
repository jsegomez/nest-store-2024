import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength, ValidateIf } from "class-validator";

export class FilterProductsDTO{
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()    
    readonly limit: number;

    @IsNumber()    
    @IsNotEmpty()        
    readonly page: number;

    @IsOptional()
    @Min(0)
    minPrice: number;
   
    @IsPositive()
    @ValidateIf( (params) => params.minPrice)
    maxPrice: number;

    @IsOptional()
    @MinLength(2)
    @IsString()
    name: string;
}


