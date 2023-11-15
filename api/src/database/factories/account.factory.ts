import { define, factory } from 'typeorm-seeding';
import { Account } from '../../app/entities/Account.entity';
import { User } from '../../app/entities/User.entity';
import { AccountType } from '../../app/entities/AccountType.entity';
import * as Faker from 'faker';

define(Account, (faker: typeof Faker, context: { user: User; accountType: AccountType }) => {
  const account = new Account();
  
  account.number = faker.random.number({min: 1000000000000000, max: 9999999999999999}).toString();
  account.doe = faker.date.past();
  account.cvv = faker.random.number({min: 100, max: 999}).toString();
  account.status = 'enabled'; // or 'disabled' or 'deleted', choose as needed
  account.balance = parseFloat(faker.finance.amount()); // Parse the amount as a float
  account.limit = parseFloat(faker.finance.amount()); // Parse the amount as a float
  account.rejections = faker.random.number({ min: 0, max: 10 }); // Adjust as needed
  account.user = context?.user; // Check if context.user is defined
  account.accountType = context?.accountType; // Check if context.accountType is defined

  return account;
});

export const createAccount = (user: User, accountType: AccountType) => factory(Account)({ user, accountType });
