import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class AppService {
  getHello(): string {
    return "hello from main";
  }
  getPost(req: any, res: Response) {
    const bioData = {
      name: req.body.name,
      lastName: req.body.lastName,
      rollNo: req.body.rollNo,
      hobby: req.body.hobby,
    };
    return res.status(201).json({
      data: bioData,
      message: "successFully Created",
    });
  }
  getData(req: any, res: Response) {
    const data = [
      {
        name: "parth",
        lastName: "radadiya",
        rollNo: "1212",
        hobby: "hiking",
      },
      {
        name: "parth",
        lastName: "radadiya",
        rollNo: "1212",
        hobby: "hiking",
      },
      {
        name: "parth",
        lastName: "radadiya",
        rollNo: "1212",
        hobby: "hiking",
      },
    ];
    if (data.length) {
      res.status(200).json({
        data: data,
        message: "successfully Fetch",
      });
    }
  }
}
