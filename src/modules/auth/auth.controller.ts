import { Body, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiController,
  PublicDecorator,
  apiResponse,
} from "src/utils/helperUtils";
import { UserService } from "../user/user.service";
import { LoginDTO } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import * as moment from "moment";

@ApiController("Auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @PublicDecorator()
  @Post("/login")
  async login(@Body() loginDTO: LoginDTO) {
    const userRes = await this.userService.login(loginDTO);

    const access_token = await this.jwtService.signAsync({ ...userRes });

    const decodeToken: any = this.jwtService.decode(access_token);
    console.log(
      "-----------",
      Math.round((new Date() as any) / 1000),
      Math.round((moment().add(2, "d").utc() as any) / 1000),
      decodeToken?.exp,
    );
    return apiResponse(HttpStatus.OK, {
      ...userRes,
      access_token,
      exp: decodeToken?.exp,
    });
  }

  @Post("/forgotPassword/:email")
  async forgotPassword(@Param("email") email: string) {
    return apiResponse(
      HttpStatus.OK,
      await this.userService.forgotPassword(email),
      "Reset link is sent to your email address, please check your inbox.",
    );
  }
}
