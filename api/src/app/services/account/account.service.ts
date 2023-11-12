import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { Account } from 'src/app/entities/Account.entity';
import { Like, Not, Repository } from 'typeorm';
import { AccountLogService } from '../account-log/account-log.service';

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        private accountLogService: AccountLogService    
    ) {}

    /**
     * This method returns a paginated list of no deleted accounts.
     * @param limit, number of elements 
     * @param offset, number of page
     * @param pattern, pattern to search
     * @returns 
     */
    async getAccounts({ limit, offset, pattern}: PaginationDto): Promise<Account[]> {
        if ( pattern === '' ){
            return await this.accountRepository.find({ 
                    relations: ['user'],
                    skip: offset,
                    take: limit,
                    where: 
                        { status: Not(`deleted`) }
          });
        } else {
            return await this.accountRepository.find({ 
                    relations: ['user'],
                    skip: offset, 
                    take: limit,  
                    where: 
                        { user: { username: Like(`${pattern}%`) },
                        status: Not(`deleted`)   
                }});
        }
    }

    /**
     * This method returns a paginated list of no deleted accounts by username.
     * @param username username of accounts 
     * @param limit  amount of elements
     * @param offset page number
     * @returns 
     */
    async getAccountsByUsernameAndByStatusNoDeleted({ limit, offset}: PaginationDto, username: string): Promise<Account[]> {
        return await this.accountRepository.find({ 
                relations: ['user'],
                skip: offset,
                take: limit, 
                where:  
                    { user: { username: username },
                    status: Not(`deleted`)  
                }
            });
    }

    /**
     * This method modifies the status of an account and inserts a new log. 
     * @param number, number of the account
     */
    async changeAccountStatus(number: string, status: string): Promise<void> {
        const account = await this.accountRepository.findOne({ number: number }).then(account => account);
        if(account == null) throw new NotFoundException('Account not found');
        account.status = status;
        account.rejections = 0;
        await this.accountRepository.save(account);
        this.accountLogService.createLog(`Account ${number} has been ${status}`, status, account);
    }

}
