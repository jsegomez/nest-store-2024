import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Pet, PetSchema } from "./pets.entity";

@Schema()
export class Customer extends Document{
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    lastname: string;

    @Prop({type: String, required: true})
    phone: string;

    @Prop({type: String, required: true, unique: true})
    email: string;

    @Prop({ type: [PetSchema] })
    pets: Types.Array<Pet>
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);



