import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminSchema } from "src/Schema/adminSchema";
import { UserSchema } from "src/Schema/userSchema";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationServices } from "./authentication.services";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/local.strategy";

@Module({
  imports: [
    PassportModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.SECRETKEY, 
      signOptions: { expiresIn: '24h' }
    }),
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Admin", schema: AdminSchema },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationServices,JwtStrategy],
})
export class AuthenticationModule {}
