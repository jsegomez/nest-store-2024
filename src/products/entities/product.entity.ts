import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document{
    @Prop({type: String, required: true, unique: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Number, required: true, index: true})
    price: number;

    @Prop({type: Number, required: true})
    stock: number;

    @Prop({type: Boolean, required: true})
    avaliable: boolean;

    @Prop({type: String, required: true})
    image: string;

    @Prop(raw({
        name: { type: String },
        image: { type: String }
    }))
    category:Record<string, any>
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({price: 1, stock: -1})