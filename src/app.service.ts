import { MailerService } from "@nestjs-modules/mailer";
import { HttpStatus, Injectable } from "@nestjs/common";
import { apkError } from "./common/globalException";
import { SentMessageInfo } from "nodemailer";

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}
  getHello(): string {
    return "Hello World!";
  }
  sendEmail = async (): Promise<string> => {
    const sendMailRes = await this.mailService.sendMail({
      to: "pitrodaraj1512@gmail.com",
      from: "tt@tt.com",
      subject: "Testing222",
      html: "<h1>Raj test heading</h1>",
    });
    if (sendMailRes?.accepted) {
      return "Please check your inbox";
    } else {
      apkError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        sendMailRes?.code + " " + sendMailRes?.response,
      );
    }
  };
}
