import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

export const getDbConnection: TypeOrmModuleOptions = {
  type: "mssql",
  port: 1433,
  host: "localhost",
  username: "sa",
  password: "123",
  database: "Volunteer",
  entities: ["dist/**/*.entity.js"],
  synchronize: false,
  extra: {
    trustServerCertificate: true,
  },
  // logging: true,
};
