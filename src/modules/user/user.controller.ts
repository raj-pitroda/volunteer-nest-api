import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { Put } from "@nestjs/common/decorators";
import { ApiController, apiResponse } from "src/utils/helperUtils";
import { ChangePasswordDTO } from "../auth/dto/changePassword.dto";

// @Controller("user") if we use this then it will not provide different menu name in swagger also token related part
@ApiController("user") //if we use this then it will  provide different menu name in swagger also token related part
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")
  async create(@Body() createUserDto: CreateUserDTO) {
    return apiResponse(
      HttpStatus.OK,
      await this.userService.create(createUserDto),
      "Record created successfully.",
    );
  }

  @Get("/getAll")
  async findAll() {
    return apiResponse(HttpStatus.OK, await this.userService.findAll());
  }

  @Get("/getById/:id")
  async findOne(@Param("id") id: string) {
    return apiResponse(HttpStatus.OK, await this.userService.findOne(+id));
  }

  @Put("/update/:id")
  async update(@Body() user: CreateUserDTO) {
    return apiResponse(
      HttpStatus.OK,
      await this.userService.update(user),
      "Record updated successfully.",
    );
  }

  @Delete("/delete/:id")
  async delete(@Param("id") id: string) {
    return apiResponse(
      HttpStatus.OK,
      await this.userService.delete(+id),
      "Record deleted successfully",
    );
  }

  @Post("/changePassword")
  async changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
    return apiResponse(
      HttpStatus.OK,
      await this.userService.changePassword(changePasswordDTO),
      "Password changed successfully.",
    );
  }
}
