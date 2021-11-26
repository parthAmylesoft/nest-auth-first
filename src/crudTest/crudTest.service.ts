import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Response } from "express";
import { Model } from "mongoose";
import { Admin } from "src/Schema/adminSchema";
import { Crud } from "src/Schema/crud_schema";
import { User } from "src/Schema/userSchema";
import { CreateUserDto, updateUserDto } from "./dto/create.user.dto";

@Injectable()
export class CrudTestService {
  constructor(@InjectModel("Crud") private readonly CrudModel: Model<Crud>) {}

  async getCrud(res: Response) {
    const getData = await this.CrudModel.find();
    if (!getData.length) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: "not found",
        statusCode: HttpStatus.NOT_FOUND,
      });
    } else {
      res.status(200).json({
        message: "successfully get",
        data: getData,
      });
    }
  }

  async getSingleCrud(id: string, res: Response) {
    const getData = await this.CrudModel.findById(id);
    res.status(200).json({
      message: "successfully get",
      data: getData,
    });
  }

  async postCrud(createUser: CreateUserDto, res: Response) {
    try {
      const getPostData = await this.CrudModel.create(createUser);
      res.status(201).json({
        message: "successfully created",
        data: getPostData,
      });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: "not found",
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }

  async putCrud(updateUser: updateUserDto, res: Response, id: string) {
    const getPutData = await this.CrudModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    res.status(201).json({
      message: "successfully Updated",
      data: getPutData,
    });
  }

  async deleteCrud(id: string, res: Response) {
    const deleteData = await this.CrudModel.findByIdAndDelete(id);
    res.status(201).json({
      message: "successfully delete",
      data: deleteData,
    });
  }
}
