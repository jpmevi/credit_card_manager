import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Account } from '../../entities/Account.entity';
import { Like, Not, Repository } from 'typeorm';
import { AccountLogService } from '../account-log/account-log.service';
import { AccountService } from '../account/account.service';
import { Transaction } from '../../entities/Transaction.entity';
import {
  CreateUserAndAccountDto,
  UpdateUserAndAccountDto,
  ValidateAccountDto,
} from '../../dtos/account.dto';
import { TransactionPaymentGatewayDto } from '../../dtos/transaction.dto';
import { AccountType } from '../../entities/AccountType.entity';
import { User } from '../../entities/User.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(AccountType)
    private readonly accountTypeRepository: Repository<AccountType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private accountLogService: AccountLogService,
    private accountService: AccountService,
  ) {}

  /**
   * This method makes a transaction between two accounts
   * @param transactionPaymentGatewayDto
   * @returns
   */
  async transaction(
    transactionPaymentGatewayDto: TransactionPaymentGatewayDto,
  ) {
    try {
      const sourceAccount = await this.accountRepository
        .findOne({ number: transactionPaymentGatewayDto.sourceAccount })
        .then((account) => account);
      if (sourceAccount == null) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `No account found for number: ${transactionPaymentGatewayDto.sourceAccount}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const destinationAccount = await this.accountRepository
        .findOne({ number: transactionPaymentGatewayDto.destinationAccount })
        .then((account) => account);
      if (destinationAccount == null) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `No account found for number: ${transactionPaymentGatewayDto.destinationAccount}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const paymentAccount = await this.accountRepository
        .findOne({ number: transactionPaymentGatewayDto.paymentAccount })
        .then((account) => account);
      if (paymentAccount == null) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `No account found for number: ${transactionPaymentGatewayDto.paymentAccount}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const paymentPercentage: number =
        transactionPaymentGatewayDto.paymentPercentage *
        transactionPaymentGatewayDto.amount;

      const transactionFeePorcentage: number =
        0.25 * Number(transactionPaymentGatewayDto.amount);

      // El Balance de la Cuenta debe ser la resta entre el monto, menos el porcentaje de la pasarela, menos el porcentaje de la transaccion
      const totalAmountTransaction =
        sourceAccount.balance -
        (transactionPaymentGatewayDto.amount +
          paymentPercentage +
          transactionFeePorcentage);
      //AQUI HAY UN BUG
      if (sourceAccount.balance < transactionPaymentGatewayDto.amount) {
        this.accountService.rejectAccount(sourceAccount.number);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `Insufficient funds`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const sourceBalance =
        Number(sourceAccount.balance) -
        Number(transactionPaymentGatewayDto.amount);
      const destinationBalance =
        Number(destinationAccount.balance) +
        Number(transactionPaymentGatewayDto.amount);
      const paymentBalance =
        Number(paymentAccount.balance) + Number(paymentPercentage);

      sourceAccount.balance = sourceBalance;
      destinationAccount.balance = destinationBalance;
      paymentAccount.balance = paymentBalance;

      await this.accountRepository.save(sourceAccount);
      await this.accountRepository.save(destinationAccount);
      await this.accountRepository.save(paymentAccount);

      const transactionSource = this.transactionRepository.create({
        amount: transactionPaymentGatewayDto.amount,
        oldBalance: sourceAccount.balance + transactionPaymentGatewayDto.amount,
        currentBalance: sourceAccount.balance,
        type: 'decrease',
        account: sourceAccount,
      });

      const transactionSourcePaymentGateway = this.transactionRepository.create(
        {
          amount: paymentPercentage,
          oldBalance: sourceAccount.balance + paymentPercentage,
          currentBalance: sourceAccount.balance,
          type: 'decrease',
          account: sourceAccount,
        },
      );

      const transactionDestination = this.transactionRepository.create({
        amount: transactionPaymentGatewayDto.amount,
        oldBalance:
          destinationAccount.balance - transactionPaymentGatewayDto.amount,
        currentBalance: destinationAccount.balance,
        type: 'increase',
        account: destinationAccount,
      });

      const transactionPaymentGateway = this.transactionRepository.create({
        amount: paymentPercentage,
        oldBalance: paymentAccount.balance - paymentPercentage,
        currentBalance: paymentAccount.balance,
        type: 'increase',
        account: paymentAccount,
      });

      await this.transactionRepository.save(transactionSource);
      await this.transactionRepository.save(transactionDestination);
      await this.transactionRepository.save(transactionPaymentGateway);

      return {
        code: HttpStatus.OK,
        status: HttpStatus.OK,
        referenceNumber: transactionSource.id,
        message: 'Transaction successful',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }
}
