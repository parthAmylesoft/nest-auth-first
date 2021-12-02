import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileSchema } from "src/Schema/fileUpladSchema";
import { FileUploadController } from "./fileUpload.controller";
import { FileUplaodServices } from "./fileUpload.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "File", schema: FileSchema }])],
  controllers: [FileUploadController],
  providers: [FileUplaodServices],
})
export class FileUploadModule {}
