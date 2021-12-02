import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FileDocument = File & Document;

@Schema({ timestamps: true})

export class File {
    _id: string;

    @Prop()
    file: string;
}

export const FileSchema = SchemaFactory.createForClass(File)