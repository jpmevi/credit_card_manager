import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/common';
import { ExampleController } from './app/controllers/example/Example.controller';
import { ExampleService } from './app/services/example/Example.service';
import { ExampleProvider } from './app/providers/example/example.provider';
import { Example } from './app/entities/Example.entity';
import { HealthController } from './app/controllers/health/Health.controller';
import { HealthService } from './app/services/health/health.service';
import { DatabaseModule } from './config/database/database.module';
import ExampleRepository from './app/repositories/Example.repository';
import { ExampleTransformer } from './app/transformers/Example.tranformer';
import { enviroments } from './config/environments';
import config from './config/config';
import schemaValidation from './config/schema.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: schemaValidation,
    }),
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20000,
    }),
    TypeOrmModule.forFeature([Example, ExampleRepository]),
    HttpModule,
  ],
  controllers: [ExampleController, HealthController],
  providers: [
    ExampleService,
    ExampleProvider,
    ExampleTransformer,
    HealthService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
