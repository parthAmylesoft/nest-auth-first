import { Controller, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { storage } from "src/util/file.upload";
import { FileUplaodServices } from "./fileUpload.service";

@Controller()
export class FileUploadController {
    constructor(private fileServices: FileUplaodServices) {}

    @Post('file-upload')
    @UseInterceptors(FileInterceptor('profile', storage))
    async fileUploadPost(@UploadedFile() file:any, @Req() req: Request, @Res() res: Response){
        return await this.fileServices.postFile(file, req, res)
    }
}