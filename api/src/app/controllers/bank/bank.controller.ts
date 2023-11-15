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
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  CreateUserAndAccountDto,
  UpdateUserAndAccountDto,
  ValidateAccountDto,
} from '../../dtos/account.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Account } from '../../entities/Account.entity';
import { AccountLogService } from '../../services/account-log/account-log.service';
import { AccountService } from '../../services/account/account.service';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private accountService: AccountService) {}

  /**
   * This endpoint deletes an account.
   * @param number, number of credit card
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
  // @HttpCode(200)
  @Post('/validateAccount')
  async createAccount(@Body() validateAccountDto: ValidateAccountDto) {
    return this.accountService.validateAccount(validateAccountDto);
  }
}
