import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { Account } from 'src/app/entities/Account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {

    constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) {}

    /**
     * This method returns a paginated list of accounts.
     * @param limit, number of elements 
     * @param offset, number of page
     * @returns 
     */
    async getAccounts({ limit, offset}: PaginationDto): Promise<Account[]> {
        return await this.accountRepository.find({ relations: ['user'], skip: offset, take: limit });
    }

    /**
     * This method returns a paginated list of accounts by username.
     * @param username 
     * @returns 
     */
    async getAccountsByUsername({ limit, offset}: PaginationDto, username: string): Promise<Account[]> {
        return await this.accountRepository.find({ relations: ['user'], skip: offset, take: limit, where: { user: { username: username } } });
    }

    /**
     * This method modifies the status of an account to enabled or disabled.
     * @param number, number of the account
     */
    async changeCreditCardStatus(number: string, status: string) {
        const account = await this.accountRepository.findOne({ number: number });
        account.status = status;
        account.rejections = 0;
        await this.accountRepository.save(account);
    }

}
