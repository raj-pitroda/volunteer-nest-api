import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateCountryDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  country_name: string;
}
