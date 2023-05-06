import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/globalException";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./utils/Guards/JWTAuth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enable cors
  app.enableCors();

  //Authentication
  //There is no way to configure such behavior in a succinct way. If useGlobalGuards used, the only way to do this is to customize or extend AuthGuard. So we can't use directly app.useGlobalGuards(new AuthGuard("jwt")) but we can use @UseGuards(AuthGuard("jwt")) with controller's method.(https://stackoverflow.com/questions/49429241/nest-js-global-authguard-but-with-exceptions)
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

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
