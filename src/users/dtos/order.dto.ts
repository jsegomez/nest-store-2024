import { PartialType } from "@nestjs/swagger";
import { IsDate, IsMongoId, IsNotEmpty } from "class-validator";

export class CreateOrderDto{
    readonly orderDate: Date;

    @IsMongoId()
    @IsNotEmpty()
    readonly customer: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto){}