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
      if (sourceAccount.status == 'disabled') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `Account is disabled`,
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
      const creditCardManagerAccount = await this.accountRepository
        .findOne({ number: '2222222222222' })
        .then((account) => account);

      const paymentPercentage: number =
        transactionPaymentGatewayDto.paymentPercentage *
        transactionPaymentGatewayDto.amount;

      const transactionFeePorcentage: number =
        0.25 * Number(transactionPaymentGatewayDto.amount);

      // El Balance de la Cuenta debe ser la resta entre el monto, menos el porcentaje de la pasarela, menos el porcentaje de la transaccion
      const totalAmountTransaction =
        Number(transactionPaymentGatewayDto.amount) +
        Number(paymentPercentage) +
        Number(transactionFeePorcentage);
      //AQUI HAY UN BUG
      if (sourceAccount.balance < totalAmountTransaction) {
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

      //Le agregamos el dinero a la cuenta de destino
      await this.accountRepository.save(destinationAccount);

      const transactionSource = this.transactionRepository.create({
        amount: transactionPaymentGatewayDto.amount,
        oldBalance: sourceAccount.balance + transactionPaymentGatewayDto.amount,
        currentBalance: sourceAccount.balance,
        type: 'decrease',
        account: sourceAccount,
      });
      await this.transactionRepository.save(transactionSource);

      // Le cobramos la comision de la transaccion
      const sourcePayments =
        Number(sourceAccount.balance) - Number(paymentPercentage);
      sourceAccount.balance = sourcePayments;
      // Le cobramos la comision de la pasarela de pagos
      await this.accountRepository.save(sourceAccount);
      const transactionSourcePaymentGateway = this.transactionRepository.create(
        {
          amount: paymentPercentage,
          oldBalance: sourceAccount.balance + paymentPercentage,
          currentBalance: sourceAccount.balance,
          type: 'decrease',
          account: sourceAccount,
        },
      );
      await this.transactionRepository.save(transactionSourcePaymentGateway);

      // Le cobramos la comision de la transaccion Fee
      const sourcePaymentsFee =
        Number(sourceAccount.balance) - Number(transactionFeePorcentage);
      sourceAccount.balance = sourcePaymentsFee;
      // Le cobramos la comision de la pasarela de pagos
      await this.accountRepository.save(sourceAccount);
      const transactionSourcePaymentFee = this.transactionRepository.create({
        amount: transactionFeePorcentage,
        oldBalance: sourceAccount.balance + transactionFeePorcentage,
        currentBalance: sourceAccount.balance,
        type: 'decrease',
        account: sourceAccount,
      });
      await this.transactionRepository.save(transactionSourcePaymentFee);

      //Le quitamos el dinero a la cuenta fuente
      await this.accountRepository.save(sourceAccount);

      const transactionDestination = this.transactionRepository.create({
        amount: transactionPaymentGatewayDto.amount,
        oldBalance:
          destinationAccount.balance - transactionPaymentGatewayDto.amount,
        currentBalance: destinationAccount.balance,
        type: 'increase',
        account: destinationAccount,
      });

      await this.transactionRepository.save(transactionDestination);

      //Le agregamos el dinero a la cuenta de la pasarela de pago
      await this.accountRepository.save(paymentAccount);

      const transactionPaymentGateway = this.transactionRepository.create({
        amount: paymentPercentage,
        oldBalance: paymentAccount.balance - paymentPercentage,
        currentBalance: paymentAccount.balance,
        type: 'increase',
        account: paymentAccount,
      });

      await this.transactionRepository.save(transactionPaymentGateway);

      //Le agregamos el dinero a la cuenta del credit card manager del transaction fee
      const destinationPaymentsFee =
        Number(creditCardManagerAccount.balance) +
        Number(transactionFeePorcentage);
      creditCardManagerAccount.balance = destinationPaymentsFee;
      await this.accountRepository.save(creditCardManagerAccount);

      const transactionDestinationPaymentFee =
        this.transactionRepository.create({
          amount: transactionFeePorcentage,
          oldBalance:
            creditCardManagerAccount.balance - transactionFeePorcentage,
          currentBalance: creditCardManagerAccount.balance,
          type: 'increase',
          account: creditCardManagerAccount,
        });

      await this.transactionRepository.save(transactionDestinationPaymentFee);

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
