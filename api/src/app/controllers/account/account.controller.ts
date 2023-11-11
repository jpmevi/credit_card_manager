import { Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { Account } from 'src/app/entities/Account.entity';
import { AccountService } from 'src/app/services/account/account.service';


@Controller('account')
export class AccountController {

    constructor(private accountService: AccountService) {} 

    /**
     * This endpoint returns a paginated list of accounts.
     * @param pagination 
     * @returns  
     */
    @Get()
    getAccountList(@Query() pagination: PaginationDto): Promise<Account[]> {
        return this.accountService.getAccounts(pagination);
    }

    /**
     * This endpoint enables a credit card.
     * @param number, number of credit card
     */
    @Patch('/enable/:number')
    enableCreditCard(@Param('number') number: string){
        this.accountService.changeCreditCardStatus(number, 'enabled');
    }

    /**
     * This endpoint disables a credit card.
     * @param number, number of credit card
     */
    @Patch('/disable/:number')
    disableCreditCard(@Param('number') number: string){
        this.accountService.changeCreditCardStatus(number, 'disabled');
    }




}
