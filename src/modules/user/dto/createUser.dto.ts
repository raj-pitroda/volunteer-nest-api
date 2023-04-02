import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateUserDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  countryId: number;

  @IsNotEmpty()
  @IsInt()
  cityId: number;
}
