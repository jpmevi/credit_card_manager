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
import {
  CreateUserAndAccountDto,
  UpdateUserAndAccountDto,
  ValidateAccountDto,
} from '../../dtos/account.dto';
import { TransactionPaymentGatewayDto } from '../../dtos/transaction.dto';
import { AccountType } from '../../entities/AccountType.entity';
import { User } from '../../entities/User.entity';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(AccountType)
    private readonly accountTypeRepository: Repository<AccountType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private accountLogService: AccountLogService,
  ) {}

  /**
   * This method returns a paginated list of no deleted accounts.
   * @param limit, number of elements
   * @param offset, number of page
   * @param pattern, pattern to search
   * @returns
   */
  async getAccounts({
    limit,
    offset,
    pattern,
  }: PaginationDto): Promise<Account[]> {
    if (pattern === '') {
      return await this.accountRepository.find({
        relations: ['user'],
        skip: offset,
        take: limit,
        where: { status: Not(`deleted`) },
      });
    } else {
      return await this.accountRepository.find({
        relations: ['user'],
        skip: offset,
        take: limit,
        where: {
          user: { username: Like(`${pattern}%`) },
          status: Not(`deleted`),
        },
      });
    }
  }

  /**
   * This method returns a paginated list of no deleted accounts by username.
   * @param username username of accounts
   * @param limit  amount of elements
   * @param offset page number
   * @returns
   */
  async getAccountsByUsernameAndByStatusNoDeleted(
    { limit, offset }: PaginationDto,
    username: string,
  ): Promise<Account[]> {
    return await this.accountRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
      where: {
        user: { username: username },
        status: Not(`deleted`),
      },
    });
  }

  /**
   * This method modifies the status of an account and inserts a new log.
   * @param number, number of the account
   */
  async changeAccountStatus(number: string, status: string): Promise<void> {
    const account = await this.accountRepository
      .findOne({ number: number })
      .then((account) => account);
    if (account == null) throw new NotFoundException('Account not found');
    account.status = status;
    if (status === 'enabled') {
      account.rejections = 0;
    }
    await this.accountRepository.save(account);
    if (status !== 'deleted') {
      this.accountLogService.createLog(
        `Account ${number} has been ${status}`,
        status,
        account,
      );
    }
  }

  /**
   * This method modifies the status of an account and inserts a new log when the account is rejected.
   * @param number, number of the account
   */
  async rejectAccount(number: string): Promise<void> {
    const account = await this.accountRepository
      .findOne({ number: number })
      .then((account) => account);
    if (account == null) throw new NotFoundException('Account not found');
    account.rejections += 1;
    if (account.rejections === 3) {
      account.status = 'disabled';
    }
    await this.accountRepository.save(account);

    this.accountLogService.createLog(
      `Account ${number} has been rejected. Insufficient funds`,
      'rejected',
      account,
    );
    if (account.status === 'disabled') {
      this.accountLogService.createLog(
        `Account ${number} has been disabled`,
        'disabled',
        account,
      );
    }
  }

  /**
   * Validate if the account exists and if the cvv is correct
   * @param validateAccountDto
   * @returns
   */
  async validateAccount(validateAccountDto: ValidateAccountDto) {
    try {
      const account = await this.accountRepository
        .findOne({ number: validateAccountDto.number })
        .then((account) => account);
      if (account == null) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `No account found for number: ${validateAccountDto.number}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const validateCvv = await bcrypt.compare(
        validateAccountDto.cvv,
        account.cvv,
      );

      if (!validateCvv) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `Invalid cvv`,
          },
          HttpStatus.OK,
        );
      }
      return {
        code: HttpStatus.OK,
        status: HttpStatus.CONTINUE,
        message: 'Successfully validated account',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  /**
   * This method creates a new account into the database
   * @param number, number of the account
   */
  async createAccount(createUserAndAccountDto: CreateUserAndAccountDto) {
    try {
      // Verificar unicidad del username
      const existingUsername = await this.userRepository.findOne({
        username: createUserAndAccountDto.username,
      });
      if (existingUsername) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: `Username ${createUserAndAccountDto.username} is already taken.`,
          },
          HttpStatus.CONFLICT,
        );
      }

      // Verificar unicidad del email
      const existingEmail = await this.userRepository.findOne({
        email: createUserAndAccountDto.email,
      });
      if (existingEmail) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: `Email ${createUserAndAccountDto.email} is already registered.`,
          },
          HttpStatus.CONFLICT,
        );
      }

      const user = this.userRepository.create(createUserAndAccountDto);
      await this.userRepository.save(user);

      const accountsDto = createUserAndAccountDto.account;
      for (const accountDto of accountsDto) {
        const accountType = await this.accountTypeRepository.findOne({
          id: parseInt(accountDto.accountType),
        });

        if (!accountType) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: `Invalid account type: ${accountDto.accountType}`,
            },
            HttpStatus.NOT_FOUND,
          );
        }
        const account = this.accountRepository.create({
          ...accountDto,
          user: user,
          accountType: accountType,
          limit: parseInt(accountDto.accountType) === 2 ? 8000 : 3000,
        });
        await this.accountRepository.save(account);

        this.accountLogService.createLog(
          `Account ${account.number} has been created`,
          'created',
          account,
        );
      }

      return this.userRepository.find({
        where: { username: user.username },
        relations: ['accounts', 'accounts.accountType'],
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  /**
   * This method deletes an account by the number.
   * @param number, number of the account
   */
  async deleteAccount(number: string, log: string) {
    try {
      const account = await this.accountRepository.findOne({ number: number });
      if (account == null)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `No account found for number: ${number}`,
          },
          HttpStatus.NOT_FOUND,
        );
      await this.changeAccountStatus(number, 'deleted');
      await this.accountRepository.softDelete(account);
      if (log == null)
        log = 'has been deleted by Administrator for breaking rules';
      this.accountLogService.createLog(
        `Account ${account.number} ${log}`,
        'deleted',
        account,
      );

      return {
        code: HttpStatus.OK,
        status: 'success',
        message: 'Account deleted successfully.',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  /**
   * This method updates an account by the number.
   * @param number, number of the account
   */
  async updateAccount(
    number: string,
    updateUserandAccountDto: UpdateUserAndAccountDto,
  ) {
    try {
      const account = await this.accountRepository.findOne({
        where: { number: number },
        relations: ['user', 'accountType'],
      });
      if (account == null)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `No account found for number: ${number}`,
          },
          HttpStatus.NOT_FOUND,
        );
      const user = await this.userRepository.findOne({
        username: account.user.username,
      });
      if (
        updateUserandAccountDto.email &&
        user.email !== updateUserandAccountDto.email
      ) {
        const existingEmail = await this.userRepository.findOne({
          email: updateUserandAccountDto.email,
        });
        if (existingEmail) {
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: `Email ${updateUserandAccountDto.email} is already registered.`,
            },
            HttpStatus.CONFLICT,
          );
        }
      }
      if (
        updateUserandAccountDto.account.idAccountType &&
        account.accountType.id !== updateUserandAccountDto.account.idAccountType
      ) {
        const accountType = await this.accountTypeRepository.findOne({
          id: updateUserandAccountDto.account.idAccountType,
        });
        if (!accountType) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: `Invalid account type: ${updateUserandAccountDto.account.idAccountType}`,
            },
            HttpStatus.NOT_FOUND,
          );
        }
        account.accountType = accountType;
      }

      this.userRepository.merge(user, updateUserandAccountDto);
      await this.userRepository.save(user);
      this.accountRepository.merge(account, updateUserandAccountDto.account);
      await this.accountRepository.save(account);
      return {
        code: HttpStatus.OK,
        status: 'success',
        message: 'Account and User updated successfully.',
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
