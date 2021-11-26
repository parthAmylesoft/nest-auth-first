/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppModule } from "./app/app.module";
import { CrusTestModule } from "./crudTest/crudTest.module";
import { config } from "dotenv";
import { AuthenticationModule } from "./authentication/authentication.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./authentication/gaurd/jwt.auth.guard";
config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB),
    AppModule,
    CrusTestModule,
    AuthenticationModule,
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard    
  }]
})
export class MainModule {}
