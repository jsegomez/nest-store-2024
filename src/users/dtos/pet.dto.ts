import { IsString, MinLength } from "class-validator";

export class PetDto{
    @IsString()
    @MinLength(2)
    readonly name: string;

    @IsString()
    @MinLength(2)
    readonly type: string;
}


