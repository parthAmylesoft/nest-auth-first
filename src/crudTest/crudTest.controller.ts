import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { Roles } from "src/authentication/gaurd/role.decorator";
import { RolesGuard } from "src/authentication/gaurd/role.guard";
import { CrudTestService } from "./crudTest.service";
import { CreateUserDto, updateUserDto } from "./dto/create.user.dto";

@Controller("crud")
export class CrudTestController {
  constructor(private crudTest: CrudTestService) {}

  @Get()
  getCrudApi(@Res() res: Response) {
    return this.crudTest.getCrud(res);
  }
  @Get("/:id")
  getOneCrudApi(@Param("id") id: string, @Res() res: Response) {
    return this.crudTest.getSingleCrud(id, res);
  }
  @Post()
  @UseGuards(RolesGuard)
  @Roles("admin")
  postCrudApi(@Body() CreateUser: CreateUserDto, @Res() res: Response) {
    return this.crudTest.postCrud(CreateUser, res);
  }
  @Put("/:id")
  putCrudApi(
    @Param("id") id: string,
    @Body() updateUser: updateUserDto,
    @Res() res: Response
  ) {
    return this.crudTest.putCrud(updateUser, res, id);
  }
  @Delete("/:id")
  deleteCrudApi(@Param("id") id: string, @Res() res: Response) {
    return this.crudTest.deleteCrud(id, res);
  }
}
