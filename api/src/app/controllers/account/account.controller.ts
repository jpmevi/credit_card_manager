import { Controller, Get, Param, Query } from '@nestjs/common';
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

}
