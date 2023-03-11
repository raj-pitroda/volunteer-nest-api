import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getDbConnection } from "./utils/dbConnection";

@Module({
  imports: [TypeOrmModule.forRoot(getDbConnection)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
