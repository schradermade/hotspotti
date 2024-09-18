import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('HotSpotti - Auth service')
    .setDescription('API documentation for the Auth service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger Ui
  SwaggerModule.setup('api-docs', app, document);

  app.use(morgan('combined'));
  await app.listen(3000, () => {
    console.log('AuthService: Listening on PORT 3000!!!');
  });
}

bootstrap();
