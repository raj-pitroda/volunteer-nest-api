import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getDbConnection } from "./utils/dbConnection";
import { UserModule } from "./modules/user/user.module";
import { CityModule } from "./modules/city/city.module";
import { CountryModule } from "./modules/country/country.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailModule } from "./modules/email/email.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot(getDbConnection),
    UserModule,
    CityModule,
    CountryModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
