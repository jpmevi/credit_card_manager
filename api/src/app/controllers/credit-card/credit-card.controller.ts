import { Controller, Param, Patch, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccountLogService } from '../../services/account-log/account-log.service';
import { CreditCardService } from '../../services/credit-card/credit-card.service';

@ApiTags('Credit Card')
@Controller('credit-card')
export class CreditCardController {

    constructor( private creditCardService: CreditCardService ) {} 

    /**
     * This endpoint enables a credit card.
     * @param number, number of credit card
     */
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })
    @Patch('/enable/:number')
    async enableCreditCard(@Param('number') number: string) : Promise<void>{
        return this.creditCardService.changeCreditCardStatus(number, 'enabled');
    }

     /**
     * This endpoint disables a credit card.
     * @param number, number of credit card
     */
     @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })
     @Patch('/disable/:number')
     async disableCreditCard(@Param('number') number: string) : Promise<void>{
        return this.creditCardService.changeCreditCardStatus(number, 'disabled');
    }
 
}
