import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Response } from "express";
import { Model } from "mongoose";
import { File } from "src/Schema/fileUpladSchema";
import { sendMailService } from "src/util/sendMail";
@Injectable()
export class FileUplaodServices {
  constructor(
    @InjectModel("File") private readonly FileModel: Model<File>,
    private sendMail: sendMailService
  ) {}

  async postFile(file, req, res: Response) {
    if (file) {
      const { filename, path } = file;
      const filedata = await this.FileModel.create({
        file: filename,
      });
      // let getFullPath = resolve(__dirname, `../../${path}`);
      res.status(201).json({
        message: "File upload",
        details: filedata,
      });
    } else {
      if (req.fileValidationError) {
        throw new BadRequestException(req.fileValidationError);
      } else {
        throw new BadRequestException();
      }
    }
  }

  async mailSendPost(req, res) {
    const a = await this.sendMail.sendMailTest(req.body.email, req.body.password);

    res.status(200).json({
      email: req.body.email,
      message: `Mail SuccessFully Send! Check Your Mail-Box Assap`
    })
  }
}
