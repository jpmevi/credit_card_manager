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
import { EmailService } from './app/services/email/email.service';
import { UserService } from './app/services/user/user.service';
import { UserController } from './app/controllers/user/user.controller';
import { AccountLogController } from './app/controllers/account-log/account-log.controller';
import { AccountLogService } from './app/services/account-log/account-log.service';
import { ReviewService } from './app/services/review/review.service';
import { ReviewController } from './app/controllers/review/review.controller';
import { ReportController } from './app/controllers/report/report.controller';
import { BankController } from './app/controllers/bank/bank.controller';
import { ReportService } from './app/services/report/report.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './app/controllers/auth/auth.controller';
import { AuthService } from './app/services/auth/auth.service';
import { TransactionService } from './app/services/transaction/transaction.service';
import { AuthGuard } from './app/guards/auth.guard';

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
    TypeOrmModule.forFeature([
      Account,
      AccountLog,
      AccountType,
      Currency,
      Review,
      Transaction,
      User,
      ExampleRepository,
    ]),
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    HealthController,
    AccountController,
    CreditCardController,
    AccountLogController,
    ReportController,
    ReviewController,
    UserController,
    AuthController,
    BankController,
  ],
  providers: [
    UserService,
    ExampleProvider,
    EmailService,
    HealthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AccountService,
    CreditCardService,
    AccountLogService,
    ReportService,
    ReviewService,
    AuthService,
    TransactionService,
  ],
  exports: [TypeOrmModule, EmailService],
})
export class AppModule {}
