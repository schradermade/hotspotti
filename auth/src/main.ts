import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('HotSpotti - Auth service')
    .setDescription('API documentation for the Auth service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger Ui
  SwaggerModule.setup('api-docs', app, document);

  // morgan logging
  app.use(morgan('combined'));

  // setup ValidationPipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000, () => {
    console.log('AuthService: Listening on PORT 3000!!!');
  });
}

bootstrap();
