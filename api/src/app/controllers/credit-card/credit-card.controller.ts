import { Controller, Param, Patch, Query } from '@nestjs/common';
import { AccountLogService } from 'src/app/services/account-log/account-log.service';
import { CreditCardService } from 'src/app/services/credit-card/credit-card.service';

@Controller('credit-card')
export class CreditCardController {

    constructor( private creditCardService: CreditCardService ) {} 

    /**
     * This endpoint enables a credit card.
     * @param number, number of credit card
     */
    @Patch('/enable/:number')
    async enableCreditCard(@Param('number') number: string) : Promise<void>{
        return this.creditCardService.changeCreditCardStatus(number, 'enabled');
    }

     /**
     * This endpoint disables a credit card.
     * @param number, number of credit card
     */
     @Patch('/disable/:number')
     async disableCreditCard(@Param('number') number: string) : Promise<void>{
        return this.creditCardService.changeCreditCardStatus(number, 'disabled');
    }
 
}
