import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthenticationServices } from "./authentication.services";
import { Public } from "./gaurd/public.decorator";

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationServices){}

    @Public()
    @Post("register-admin")
    async registerAdmin(@Req() req:Request,@Res() res: Response){
        return await this.authenticationService.createAdmin(req.body,res)
    }

    @Public()
    @Post('register-user')
    async registerUser(@Req() req:Request, @Res() res: Response){
        return await this.authenticationService.createUser(req.body,res)
    }

    @Public()
    @Post("login-user")
    async loginUserApi(@Req() req:Request, @Res() res:Response){
        return await this.authenticationService.loginUser(req.body,res)
    }

    @Public()
    @Post("login-admin")
    async loginAdminApi(@Req() req:Request, @Res() res: Response){
        return await this.authenticationService.loginAdmin(req.body,res)
    }

}