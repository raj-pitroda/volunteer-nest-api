import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { CreateUserDTO } from "./dto/createUser.dto";
import { Repository } from "typeorm";
import { apkError } from "src/common/globalException";
import {
  decryptString,
  encryptString,
  notFoundException,
} from "src/utils/helperUtils";
import { LoginDTO } from "../auth/dto/login.dto";
import * as moment from "moment";
import { EmailService } from "../email/email.service";
import { ChangePasswordDTO } from "../auth/dto/changePassword.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  create = (createUserDto: CreateUserDTO): Promise<User> => {
    const { email, firstName, lastName, password } = createUserDto;
    return this.usersRepository
      .findOneBy({
        email: email,
      })
      .then((res) => {
        if (res?.id) {
          throw apkError(
            HttpStatus.CONFLICT,
            "Record is already exist with this email.",
          );
        } else {
          return this.usersRepository.save({
            email,
            firstName,
            lastName,
            password,
            country: { id: createUserDto.countryId },
            city: { id: createUserDto.cityId },
          });
        }
      });
  };

  findAll = async (): Promise<{ totalRecord: any; records: any }> => {
    const data = await this.usersRepository.findAndCount();
    if (data?.length) {
      return Promise.resolve({
        totalRecord: data[1],
        records: data[0],
      });
    } else return null;
  };

  findOne = (id: number): Promise<User> => {
    return this.findOne(id);
  };

  update = (user: CreateUserDTO): Promise<User> => {
    return this.usersRepository
      .findOneBy({
        id: user.id,
      })
      .then((res) => {
        if (res?.id) {
          return this.usersRepository.save(user);
        } else {
          notFoundException();
        }
      });
  };

  delete = (id: number): Promise<number> => {
    return this.usersRepository
      .findOneBy({
        id: id,
      })
      .then(async (res) => {
        if (res?.id) {
          await this.usersRepository.delete(id);
          return Promise.resolve(id);
        } else {
          notFoundException();
        }
      });
  };

  login = async (loginDto: LoginDTO): Promise<User> => {
    const existingUser = await this.usersRepository.findOne({
      where: { email: loginDto.email },
      // loadRelationIds: true,
    });
    if (existingUser) {
      if (existingUser.password === loginDto.password) {
        return existingUser;
      } else {
        apkError(
          HttpStatus.NOT_FOUND,
          "Wrong password entered, please check and try again.",
        );
      }
    } else {
      apkError(
        HttpStatus.NOT_FOUND,
        "Entered email is not exist, please register first.",
      );
    }
  };

  forgotPassword = async (email: string): Promise<string> => {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (user) {
      const tokenLink = {
        userEmail: user.email,
        linkExpireDate: new Date(
          moment(new Date()).add(30, "minute").toDate(),
        ).toUTCString(),
      };

      return await this.emailService.sendEmail({
        to: email,
        subject: "Reset Password",
        emailBody: `<h2>Click Below link to reset your password</h2><br /> <a href="${
          "localhost:4200/reset-password?tokenLink=" +
          encryptString(JSON.stringify(tokenLink))
        }">Click here...</a>`,
      });
    } else {
      apkError(HttpStatus.NOT_FOUND, "Entered email does not exist in db.");
    }
  };

  changePassword = async (
    changePasswordDTO: ChangePasswordDTO,
  ): Promise<any> => {
    const user = await this.usersRepository.findOne({
      where: { email: changePasswordDTO.email },
    });

    if (user) {
      await this.usersRepository.update(user.id, {
        password: changePasswordDTO.password,
      });
    } else {
      apkError(HttpStatus.NOT_FOUND, "Entered email does not exist in db.");
    }
  };
}
