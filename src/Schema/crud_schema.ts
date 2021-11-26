import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CrudDocument = Crud & Document;

@Schema({ timestamps: true})
export class Crud {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  city: string;

  @Prop()
  year: string;

  @Prop({ default: "user" })
  role: string;

  @Prop({ default: "yes" })
  active: string;

}

export const CrudSchema = SchemaFactory.createForClass(Crud);