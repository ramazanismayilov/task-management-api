import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger/swagger.config';
import { HttpExceptionFilter } from './core/filters/http-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  });

  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalFilters(app.get(HttpExceptionFilter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  setupSwagger(app)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
