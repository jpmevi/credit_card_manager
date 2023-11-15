import { define, factory } from 'typeorm-seeding';
import { AccountType } from '../../app/entities/AccountType.entity';
import { Currency } from '../../app/entities/Currency.entity';
import * as Faker from 'faker';

define(AccountType, (faker: typeof Faker, context: { type: string, currency: Currency }) => {
    const accountType = new AccountType();
    accountType.description = faker.lorem.words(3); // Adjust as needed
    accountType.type = context.type;
    accountType.defaultLimit = faker.finance.amount();
    accountType.currency = context.currency;

    return accountType;
});

export const createAccountType = () => factory(AccountType)({});
