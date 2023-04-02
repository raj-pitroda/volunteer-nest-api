import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/globalException";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enable cors
  app.enableCors();

  //Manage Swagger
  //Please hide this in production
  //For model binding in request body use "@nestjs/swagger/plugin" code in nestcli json
  const options = new DocumentBuilder()
    .setTitle("title")
    .setDescription("des")
    .setVersion("ver")
    .addBearerAuth({ type: "http", in: "header" })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  //global validator as per DTO
  app.useGlobalPipes(new ValidationPipe());

  //Global exception
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
