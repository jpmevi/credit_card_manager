import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/app/entities/Account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditCardService {

    constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) {}

    /**
     * This method modifies the status of an account to enable or disable.
     * @param number, number of the account
     */
    async changeCreditCardStatus(number: string, status: string) {
        const account = await this.accountRepository.findOne({ number: number });
        if(account == null) throw new NotFoundException('Credit card not found');
        account.status = status;
        account.rejections = 0;
        await this.accountRepository.save(account);
    }

}
