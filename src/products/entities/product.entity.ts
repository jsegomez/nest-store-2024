import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Brand } from "./brand.entity";
import { Category, CategorySchema } from "./category.entity";

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

    @Prop({type: Types.ObjectId, ref: Brand.name})
    brand: Brand | Types.ObjectId;

    @Prop({type: CategorySchema})
    category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({price: 1, stock: -1})


