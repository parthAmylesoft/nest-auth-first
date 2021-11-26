import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class testMiddlewere implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        if(!req.body){
            throw new UnauthorizedException();
        }else{
            next();
        }
        // const dataGet  = req.headers.test;
        // if (dataGet !== undefined) {
        //     next();
        // }else{
        //     throw new UnauthorizedException();
        // }
    }
}   