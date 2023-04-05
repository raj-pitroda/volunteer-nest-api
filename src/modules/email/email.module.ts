import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./email.service";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_SENDER_HOST, // currently used sendinblue smtp server
        auth: {
          user: process.env.MAIL_SENDER_USER, // currently used sendinblue smtp login mail
          pass: process.env.MAIL_SENDER_PASS, // SMTP generated key
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
