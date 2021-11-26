import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  _id: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  hobby: string;

  @Prop({ default: "admin" })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
