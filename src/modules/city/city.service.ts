import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { apkError } from "src/common/globalException";
import { City } from "src/entities/city.entity";
import { Repository } from "typeorm";
import { CreateCityDTO } from "./dto/createCity.dto";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}
  create = async (city: CreateCityDTO) => {
    const isExist = await this.cityRepository.findOneBy({
      city_name: city.city_name,
    });
    if (isExist) {
      apkError(HttpStatus.CONFLICT, "City already exist with same name.");
    } else {
      return this.cityRepository.save({
        id: city.id,
        city_name: city.city_name,
        country: { id: city.countryId },
      });
    }
  };

  getAll = async () => {
    const data = await this.cityRepository.findAndCount();
    if (data?.length) {
      return Promise.resolve({
        totalRecord: data[1],
        records: data[0],
      });
    } else return null;
  };

  getByCountryId = async (countryId: number) => {
    const data = await this.cityRepository.find({
      where: {
        country: { id: countryId },
      },
    });
    if (data?.length) {
      return Promise.resolve(data);
    } else return null;
  };
}
