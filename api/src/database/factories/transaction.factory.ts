import * as Faker from 'faker';
import { Account } from 'src/app/entities/Account.entity';
import { Transaction } from 'src/app/entities/Transaction.entity';
import { define } from 'typeorm-seeding';

define(Transaction, (faker: typeof Faker, context: { account: Account }) => {
    const transaction = new Transaction();

    transaction.amount = parseFloat(faker.finance.amount());
    transaction.oldBalance = parseFloat(faker.finance.amount());
    transaction.currentBalance = parseFloat(faker.finance.amount());
    transaction.type = faker.random.arrayElement(['increase', 'decrease']);
    transaction.createdAt = faker.date.past();
    transaction.account = context.account;
    
    return transaction;
});
