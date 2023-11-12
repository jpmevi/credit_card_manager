import { define, factory } from 'typeorm-seeding';
import { Currency } from 'src/app/entities/Currency.entity';
import * as Faker from 'faker';

define(Currency, (faker: typeof Faker, context: { type: string }) => {
  const currency = new Currency();
  currency.description = faker.lorem.words(1); // Adjust as needed
  currency.type = context.type;
  currency.exchangeType = faker.finance.amount();

  return currency;
});

export const createCurrency = () => factory(Currency)({});
