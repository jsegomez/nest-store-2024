import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class User extends Document{
  @Prop({type: String, required: true})
  name: string;

  @Prop({type: String, required: true})
  lastname: string;

  @Prop({type: String, required: true, unique: true})
  email: string;

  @Prop({type: String, required: true})
  password: string;

  @Prop({type: String, required: true})
  role: string;
  // interests: Types.Array<Record<string, any>>
}

export const UserSchema = SchemaFactory.createForClass(User);