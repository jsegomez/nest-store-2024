import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document{
    @Prop({type: String, required: true, unique: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Number, required: true})
    price: number;

    @Prop({type: Number, required: true})
    stock: number;

    @Prop({type: Boolean, required: true})
    avaliable: boolean;

    @Prop({type: String, required: true})
    image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);