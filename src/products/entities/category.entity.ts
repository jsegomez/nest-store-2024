import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Category {
    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true})
    image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);




