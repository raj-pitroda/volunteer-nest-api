import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getDbConnection } from "./utils/dbConnection";
import { UserModule } from "./modules/user/user.module";
import { CityModule } from "./modules/city/city.module";
import { CountryModule } from "./modules/country/country.module";
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDbConnection),
    UserModule,
    CityModule,
    CountryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
