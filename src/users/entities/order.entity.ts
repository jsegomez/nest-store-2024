import { Customer } from "./customer.entity";
import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Order extends Document{
    @Prop({ type: Date })
    orderDate: Date;

    @Prop({ type: Types.ObjectId, ref: Customer.name })
    customer: Customer | Types.ObjectId;    
}
export const OrderSchema = SchemaFactory.createForClass(Order);

