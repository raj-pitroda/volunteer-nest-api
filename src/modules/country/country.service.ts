import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { apkError } from "src/common/globalException";
import { Country } from "src/entities/country.entity";
import { Repository } from "typeorm";
import { CreateCountryDTO } from "./dto/createCountry.dto";

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  create = async (country: CreateCountryDTO) => {
    const isExist = await this.countryRepository.findBy({
      country_name: country.country_name,
    });
    if (isExist) {
      apkError(HttpStatus.CONFLICT, "Country already exist with same name.");
    } else {
      this.countryRepository.save(country);
    }
  };

  getAll = async () => {
    const data = await this.countryRepository.findAndCount();
    if (data?.length) {
      return Promise.resolve({
        totalRecord: data[1],
        records: data[0],
      });
    } else return null;
  };
}
