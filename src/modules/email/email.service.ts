import { MailerService } from "@nestjs-modules/mailer";
import { HttpStatus, Injectable } from "@nestjs/common";
import { apkError } from "src/common/globalException";
import { FROM_EMAIL_CONST } from "src/utils/constant";

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}
  sendEmail = async (mailConfig: {
    to: string;
    subject: string;
    emailBody: string;
    from?: string;
  }) => {
    const { to, from, subject, emailBody } = mailConfig;
    const sendMailRes = await this.mailService.sendMail({
      to: to,
      from: from ? from : FROM_EMAIL_CONST,
      subject: subject,
      html: emailBody,
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
