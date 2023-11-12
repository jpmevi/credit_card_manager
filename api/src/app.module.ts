import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/common';
import { ExampleProvider } from './app/providers/example/example.provider';
import { HealthController } from './app/controllers/health/Health.controller';
import { HealthService } from './app/services/health/health.service';
import { DatabaseModule } from './config/database/database.module';
import ExampleRepository from './app/repositories/User.repository';
import { enviroments } from './config/environments';
import config from './config/config';
import schemaValidation from './config/schema.validation';
import { Account } from './app/entities/Account.entity';
import { AccountLog } from './app/entities/AccountLog.entity';
import { AccountType } from './app/entities/AccountType.entity';
import { Currency } from './app/entities/Currency.entity';
import { Review } from './app/entities/Review.entity';
import { Transaction } from './app/entities/Transaction.entity';
import { User } from './app/entities/User.entity';
import { AccountController } from './app/controllers/account/account.controller';
import { AccountService } from './app/services/account/account.service';
import { CreditCardController } from './app/controllers/credit-card/credit-card.controller';
import { CreditCardService } from './app/services/credit-card/credit-card.service';
import { AccountLogController } from './app/controllers/account-log/account-log.controller';
import { AccountLogService } from './app/services/account-log/account-log.service';
import { ReportController } from './app/controllers/report/report.controller';
import { ReportService } from './app/services/report/report.service';

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
    TypeOrmModule.forFeature([Account, AccountLog, AccountType, Currency, Review, Transaction, User, ExampleRepository]),
    HttpModule,
  ],
  controllers: [HealthController, AccountController, CreditCardController, AccountLogController, ReportController],
  providers: [
    ExampleProvider,
    HealthService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AccountService,
    CreditCardService,
    AccountLogService,
    ReportService
  ],
  exports: [TypeOrmModule],
})
export class AppModule { }
