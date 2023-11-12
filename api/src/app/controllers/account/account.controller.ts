import { Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
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
    async getAccountList(@Query() pagination: PaginationDto): Promise<Account[]> {
        return this.accountService.getAccounts(pagination);
    }

    /**
     * This endpoint returns a paginated list of accounts by username.
     * @param pagination 
     * @param username 
     * @returns 
     */
    @Get('/:username')
    async getAccountListByUsername(@Query() pagination: PaginationDto, @Param('username') username: string): Promise<Account[]> {
        return this.accountService.getAccountsByUsername(pagination, username);
    }

     /**
     * This endpoint deletes an account.
     * @param number, number of credit card
     */
     @Delete('/:number')
     async deleteAccount(@Param('number') number: string) : Promise<void>{
        return this.accountService.changeAccountStatus(number, 'deleted');
    }

}
