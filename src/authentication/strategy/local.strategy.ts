import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthenticationServices } from "../authentication.services";
import { JwtPayload } from "../dto/jwt.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticationService: AuthenticationServices
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.SECRETKEY,
      });
  }

  async validate(payload: JwtPayload){
      let user = {};
      user = await this.authenticationService.validateUser(payload.id)
      if(!user){
        user = await this.authenticationService.validateUserAd(payload.id)
    }
    if(!user){
        throw new UnauthorizedException();
    }

    return user;
  }

}
