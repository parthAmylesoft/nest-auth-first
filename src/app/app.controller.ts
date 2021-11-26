import { Controller, Get, Post, Redirect, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get("user")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("posy-user")
  getPost(@Req() req: Request, @Res() res: Response) {
    return this.appService.getPost(req, res);
  }

  @Get("someData")
  @Redirect("https://nestjs.com", 301)
  getData(@Req() req: any, @Res() res: Response) {
    return this.appService.getData(req, res);
  }
}
