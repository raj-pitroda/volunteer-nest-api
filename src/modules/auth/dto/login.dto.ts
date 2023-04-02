import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  password: string;
}
