import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/app/entities/Account.entity';
import { Repository } from 'typeorm';
import { AccountLogService } from '../account-log/account-log.service';

@Injectable()
export class CreditCardService {

    constructor(
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        private accountLogService: AccountLogService   
    ) {}

    /**
     * This method modifies the status of an account to enable or disable and inserts a new log.
     * @param number, number of the account
     */
    async changeCreditCardStatus(number: string, status: string) : Promise<void>{
        var account = await this.accountRepository.findOne({ number: number }).then(account => account);
        if(account == null) throw new NotFoundException('Credit card not found');
        account.status = status;
        account.rejections = 0;
        await this.accountRepository.save(account);
        this.accountLogService.createLog(`Credit card ${number} has been ${status}`, status, account);
    }

}
