import { Body, Get, HttpStatus, Post } from "@nestjs/common";
import { ApiController, apiResponse } from "src/utils/helperUtils";
import { CountryService } from "./country.service";
import { CreateCountryDTO } from "./dto/createCountry.dto";

// @Controller("country") if we use this then it will not provide different menu name in swagger also token related part
@ApiController("country") //if we use this then it will  provide different menu name in swagger also token related part
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get("/getAll")
  async getAll() {
    return apiResponse(HttpStatus.OK, await this.countryService.getAll());
  }

  @Post("/create")
  async create(@Body() createDTO: CreateCountryDTO) {
    return apiResponse(
      HttpStatus.OK,
      await this.countryService.create(createDTO),
    );
  }
}
