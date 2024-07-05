import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pet extends Document{
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    type: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);



