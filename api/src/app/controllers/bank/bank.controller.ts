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
import { ValidateAccountDto } from '../../dtos/account.dto';
import { TransactionPaymentGatewayDto } from '../../dtos/transaction.dto';
import { AccountService } from '../../services/account/account.service';
import { TransactionService } from '../../services/transaction/transaction.service';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
  ) {}

  /**
   * This endpoint deletes an account.
   * @param number, number of credit card
   */
  @ApiResponse({
    status: 100,
    description: 'Successfully validated account',
    type: ValidateAccountDto,
  })
  @ApiResponse({
    status: 404,
    description: `Not Found. No account found for number: {number}`,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Other errors.' })
  // @HttpCode(200)
  @Post('/validateAccount')
  async createAccount(@Body() validateAccountDto: ValidateAccountDto) {
    return this.accountService.validateAccount(validateAccountDto);
  }

  @ApiResponse({
    status: 100,
    description: 'Transaction successful',
    type: TransactionPaymentGatewayDto,
  })
  @ApiResponse({
    status: 404,
    description: `Not Found. No account found for number: {number}`,
  })
  @ApiResponse({
    status: 409,
    description: 'Error. insufficient funds to complete the transaction',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Other errors.' })
  @Post('/transaction')
  async transaction(
    @Body() transactionPaymentGatewayDto: TransactionPaymentGatewayDto,
  ) {
    return this.transactionService.transaction(transactionPaymentGatewayDto);
  }
}
