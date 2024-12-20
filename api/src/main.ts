import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {config} from "dotenv";
import {clerkMiddleware} from "@clerk/express";
const morgan = require('morgan')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads into DTO instances
      whitelist: true, // Strip properties not defined in the DTO
      forbidNonWhitelisted: true, // Forbid undefined properties
    }),
  );

    app.use(morgan('combined'))

    app.use(clerkMiddleware())
    await app.listen(3000);
}

config();
bootstrap();
