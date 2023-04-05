import { Body, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiController, apiResponse } from "src/utils/helperUtils";
import { UserService } from "../user/user.service";
import { LoginDTO } from "./dto/login.dto";

@ApiController("Auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Post("/login")
  async login(@Body() loginDTO: LoginDTO) {
    return apiResponse(HttpStatus.OK, await this.userService.login(loginDTO));
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
