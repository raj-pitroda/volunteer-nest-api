import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/globalException";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./utils/Guards/JWTAuth.guard";
import { RoleGuard } from "./utils/Guards/role.guard";
import { RoleService } from "./modules/role/role.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enable cors
  app.enableCors();

  //Authentication
  // app.useGlobalGuards(new (AuthGuard("jwt"))()); // we can use simple like  this as well but we need to use public method as well so we are using this below by creating custom hook
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

  // Manage roles
  const roleService = app.get(RoleService);
  app.useGlobalGuards(new RoleGuard(app.get(Reflector), roleService));

  //Global exception
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(8080);
}
bootstrap();
