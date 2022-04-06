import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //This is a global Error handler
  app.useGlobalFilters(new HttpExceptionFilter());
  //This is setup for uri versioning
  // app.enableVersioning({ type: VersioningType.URI });
  await app.listen(3000);
}
bootstrap();
