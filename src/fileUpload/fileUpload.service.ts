import {
  BadRequestException,
  Injectable
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Response } from "express";
import { Model } from "mongoose";
import { File } from "src/Schema/fileUpladSchema";

@Injectable()
export class FileUplaodServices {
  constructor(@InjectModel("File") private readonly FileModel: Model<File>) {}

  async postFile(file, req, res: Response) {
    if (file) {
      const { filename, path } = file;
      res.status(201).json({
        message: "File upload",
        details: {
          filename: filename,
          path: path,
        },
      });
    } else {
      if (req.fileValidationError) {
        throw new BadRequestException(req.fileValidationError);
      } else {
        throw new BadRequestException();
      }
    }
  }
}
