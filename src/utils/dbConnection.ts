import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getDbConnection: TypeOrmModuleOptions = {
  type: "mssql",
  port: 1433,
  host: "localhost",
  username: "sa",
  password: "123",
  database: "Volunteer",
  entities: ["dist/entities/**/*.js"],
  synchronize: false,
  extra: {
    trustServerCertificate: true,
  },
};
