import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { EmailModule } from "../email/email.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/utils/Stratergy/jwt.strategry";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "2d" },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy], // Point to Notes: For jwt mostly two strategy are user 1.local 2.JWT local is mainly need to pass    username/email and password EVERYTIME bt with jwt we can generate token and can use EVERYTIME that token, Local is mostly used for login method bt that's fine if we skip that
})
export class AuthModule {}
