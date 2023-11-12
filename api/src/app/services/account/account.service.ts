import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { Account } from 'src/app/entities/Account.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AccountService {

    constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) {}

    /**
     * This method returns a paginated list of accounts.
     * @param limit, number of elements 
     * @param offset, number of page
     * @returns 
     */
    async getAccounts({ limit, offset, pattern}: PaginationDto): Promise<Account[]> {
        if ( pattern === '' ){
            return await this.accountRepository.find({ relations: ['user'], skip: offset, take: limit });
        } else {
            return await this.accountRepository.find({ relations: ['user'], skip: offset, take: limit,  where: { user: { username: Like(`${pattern}%`) }} });
        }
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
     * This method modifies the status of an account.
     * @param number, number of the account
     */
    async changeAccountStatus(number: string, status: string) {
        const account = await this.accountRepository.findOne({ number: number });
        if(account == null) throw new NotFoundException('Account not found');
        account.status = status;
        account.rejections = 0;
        await this.accountRepository.save(account);
    }

}
