import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  CreateUserAndAccountDto,
  UpdateUserAndAccountDto,
} from '../../dtos/account.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Account } from '../../entities/Account.entity';
import { AccountLogService } from '../../services/account-log/account-log.service';
import { AccountService } from '../../services/account/account.service';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  /**
   * This endpoint returns a paginated list of no deleted accounts.
   * @param pagination
   * @returns
   */
  @Get()
  async getAccountList(@Query() pagination: PaginationDto): Promise<Account[]> {
    return this.accountService.getAccounts(pagination);
  }

  /**
   * This endpoint returns a paginated list of no deleted accounts by username.
   * @param pagination
   * @param username
   * @returns
   */
  @Get('/:username')
  async getAccountListByUsername(
    @Query() pagination: PaginationDto,
    @Param('username') username: string,
  ): Promise<Account[]> {
    return this.accountService.getAccountsByUsernameAndByStatusNoDeleted(
      pagination,
      username,
    );
  }

  /**
   * This endpoint deletes an account.
   * @param number, number of credit card
   */
  @Delete('status/:number/:status')
  async disableAccount(
    @Param('number') number: string,
    @Param('status') status: string,
  ): Promise<void> {
    return this.accountService.changeAccountStatus(number, status);
  }

  /**
   * This endpoint creates an account and a user.
   */
  @ApiResponse({
    status: 201,
    description: 'The user and accounts have been successfully created.',
    type: CreateUserAndAccountDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Username or email already exists.',
  })
  @ApiResponse({ status: 404, description: 'Not Found. Invalid account type.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Other errors.' })
  @Post()
  async createAccount(
    @Body() createUserandAccountDto: CreateUserAndAccountDto,
  ) {
    return this.accountService.createAccount(createUserandAccountDto);
  }

  /**
   * This endpoint updates an account and user by account number
   */
  @ApiResponse({
    status: 200,
    description: 'Successful update of the account and user.',
  })
  @ApiResponse({
    status: 404,
    description:
      'Not Found. The account was not found for the provided number.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. The email is already registered with another user.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. The username is already in use.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Invalid or not found account type.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Generic error in the request.',
  })
  @Patch('/:number')
  async updateAccount(
    @Param('number') number: string,
    @Body() updateUserandAccountDto: UpdateUserAndAccountDto,
  ) {
    return this.accountService.updateAccount(number, updateUserandAccountDto);
  }

  /**
   * This endpoint deletes an account by number
   */
  @ApiResponse({ status: 200, description: 'Account deleted successfully.' })
  @ApiResponse({
    status: 404,
    description: 'No account found for the given number.',
  })
  @Delete('/:number')
  async deleteAccount(
    @Param('number') number: string,
    @Body() log: Record<string, any>,
  ) {
    return this.accountService.deleteAccount(number, log.log);
  }
}
