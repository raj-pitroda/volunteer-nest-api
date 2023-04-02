import { Body, Get, HttpStatus, Post,Param } from "@nestjs/common";
import { ApiController, apiResponse } from "src/utils/helperUtils";
import { CityService } from "./city.service";
import { CreateCityDTO } from "./dto/createCity.dto";

// @Controller("city") if we use this then it will not provide different menu name in swagger also token related part
@ApiController("city") //if we use this then it will  provide different menu name in swagger also token related part
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get("/getAll")
  async getAll() {
    return apiResponse(HttpStatus.OK, await this.cityService.getAll());
  }

  @Post("/create")
  async create(@Body() createDTO: CreateCityDTO) {
    return apiResponse(HttpStatus.OK, await this.cityService.create(createDTO));
  }

  @Get("/getByCountryId/:countryId")
  async getByCountryId(@Param("countryId") countryId: string) {
    return apiResponse(HttpStatus.OK, await this.cityService.getByCountryId(+countryId));
  }
}
