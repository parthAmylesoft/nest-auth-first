import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Response } from "express";
import { Model } from "mongoose";
import { Admin, AdminDocument } from "src/Schema/adminSchema";
import { User, UserDocument } from "src/Schema/userSchema";
import { RegisterUserDto } from "./dto/register.user.dto";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login.user.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./dto/jwt.dto";
import { loginAdminDto } from "./dto/login.admin.dto";
import { registerAdminDto } from "./dto/register.admin.dto";

Injectable();
export class AuthenticationServices {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel("User") private readonly userModel: Model<UserDocument>,
    @InjectModel("Admin") private readonly adminModel: Model<AdminDocument>
  ) {}

  async createAdmin(admin: registerAdminDto, res) {
    const isEmailValidate = await this.adminModel.findOne({
      email: admin.email,
    });
    if (isEmailValidate) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: "Email Already Exits",
        statusCode: HttpStatus.BAD_REQUEST,
      });
    } else {
      const securePassword = await bcrypt.hash(admin.password, 12);
      admin.password = securePassword;
      const registerAdmin = await this.adminModel.create(admin);
      if (registerAdmin) {
        res.status(HttpStatus.OK).json({
          message: "Register SuccessFully",
          statusCode: HttpStatus.OK,
          data: registerAdmin,
        });
      }
    }
  }

  async createUser(user: RegisterUserDto, res: Response) {
    const emailValidate = await this.userModel.findOne({ email: user.email });
    if (emailValidate) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: "Email Already Exits",
        statusCode: HttpStatus.BAD_REQUEST,
      });
    } else {
      const securePassword = await bcrypt.hash(user.password, 12);
      user.password = securePassword;
      const registerUser = await this.userModel.create(user);
      if (registerUser) {
        res.status(HttpStatus.OK).json({
          message: "Registration successfully",
          statusCode: HttpStatus.OK,
          data: registerUser,
        });
      }
    }
  }

  async loginUser(userLogin: LoginUserDto, res) {
    const getLoginUser = await this.userModel.findOne({
      email: userLogin.email,
    });
    if (getLoginUser) {
      const comparePassword = await bcrypt.compare(
        userLogin.password,
        getLoginUser.password
      );
      if (comparePassword) {
        const payload: JwtPayload = getLoginUser.id;
        const token: string = this.jwtService.sign(
          { id: payload },
          { secret: process.env.SECRETKEY }
        );
        res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "Login successfully",
          Token: token,
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "Invalid login credentials",
        });
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Invalid login credentials",
      });
    }
  }

  async loginAdmin(adminLogin: loginAdminDto, res) {
    const getLoginAdmin = await this.adminModel.findOne({
      email: adminLogin.email,
    });
    if (getLoginAdmin) {
      const comparePassword = await bcrypt.compare(
        adminLogin.password,
        getLoginAdmin.password
      );
      if (comparePassword) {
        const payload: JwtPayload = getLoginAdmin.id;
        const token: string = this.jwtService.sign(
          { id: payload },
          { secret: process.env.SECRETKEY }
        );
        res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "Login SuccessFully",
          Token: token,
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "Invalid login credentials",
        });
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Invalid login credentials",
      });
    }
  }

  async validateUser(id: string): Promise<User | boolean> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    } else {
      return false;
    }
  }

  async validateUserAd(id: string): Promise<Admin | boolean> {
    const user = await this.adminModel.findById(id);
    if (user) {
      return user;
    } else {
      return false;
    }
  }
}
