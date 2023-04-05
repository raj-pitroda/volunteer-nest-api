import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { EmailModule } from "../email/email.module";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
