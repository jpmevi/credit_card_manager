import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global prefix REST API
  app.setGlobalPrefix('api');

  // Validate and transform the request
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Transform the response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Security
  app.enableCors();

  // Documentation
  const config = new DocumentBuilder()
    .setTitle('TradeEC API')
    .setDescription('Boilerplate NestJS MySQL')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on Port: ${process.env.PORT || 3000}`);
}
bootstrap();
