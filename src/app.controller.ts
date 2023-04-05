import { Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { apiResponse } from "./utils/helperUtils";
import { EmailService } from "./modules/email/email.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async sendMail() {
    // await this.appService.sendEmail();
    return apiResponse(
      HttpStatus.OK,
      "",
      await this.emailService.sendEmail({
        emailBody: "<h1>text mail body</h1>",
        subject: "TEST EMAIL",
        to: "pitrodaraj1512@gmail.com",
      }),
    );
  }
}
