import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { join } from "path";

@Injectable()
export class sendMailService {
  constructor(private mailer: MailerService) {}

  async sendMailTest(email,password){
      await this.mailer.sendMail({
          from: 'parth.amylesoft@gmail.com',
          to: email,
          template:join(__dirname,'../../views/index.hbs'),
          context:{
              email: email,
              password: password
          }        
      })
  }
}
