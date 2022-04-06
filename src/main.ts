import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //This is a global Error handler
  app.useGlobalFilters(new HttpExceptionFilter());
  //This is setup for uri versioning
  app.enableVersioning({ type: VersioningType.URI });
  //Setting Up the Swagger Ui for Api
  const config = new DocumentBuilder()
    .setTitle('User Authentication')
    .setDescription(
      'This is a Simple Api for Creating the user and login user with json web token',
    )
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
