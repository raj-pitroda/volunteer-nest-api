import { Body, HttpStatus, Post } from "@nestjs/common";
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
}
