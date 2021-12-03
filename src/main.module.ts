/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppModule } from "./app/app.module";
import { CrusTestModule } from "./crudTest/crudTest.module";
import { config } from "dotenv";
import { AuthenticationModule } from "./authentication/authentication.module";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./authentication/gaurd/jwt.auth.guard";
import { FileUploadModule } from "./fileUpload/fileUpload.module";
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from "path";
config();

const path = join(__dirname, '../../views');
@Module({
  imports: [
    MailerModule.forRoot({
      transport:{ 
        host:process.env.SMTP_HOST,
        secure:false,
        auth:{
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        }
      },
      defaults: { 
        from: process.env.SMTP_EMAIL,
      },
      template: { 
        dir: path,
        adapter: new HandlebarsAdapter(),
        options: { 
          strict: false
        }
      }
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    AppModule,
    CrusTestModule,
    AuthenticationModule,
    FileUploadModule
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard    
  }]
})
export class MainModule {}
