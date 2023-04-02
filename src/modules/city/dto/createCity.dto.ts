import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateCityDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  city_name: string;

  @IsNotEmpty()
  @IsInt()
  countryId: number;
}
