import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads into DTO instances
      whitelist: true, // Strip properties not defined in the DTO
      forbidNonWhitelisted: true, // Forbid undefined properties
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();