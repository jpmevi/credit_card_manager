import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/app/entities/User.entity';
import { Account } from 'src/app/entities/Account.entity';
import { AccountType } from 'src/app/entities/AccountType.entity';
import { Currency } from 'src/app/entities/Currency.entity';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const users = await factory(User)().createMany(10);

        const currencies = await Promise.all([
            factory(Currency)({ type: 'dollar' }).create(),
            factory(Currency)({ type: 'quetzal' }).create(),
        ]);

        const accountTypes = await Promise.all([
            factory(AccountType)({ type: 'gold', currency: currencies[0] }).create(),
            factory(AccountType)({ type: 'normal', currency: currencies[1] }).create(),
        ]);

        for (const user of users) {
            await factory(Account)({ user, accountType: accountTypes[0] }).create();
            await factory(Account)({ user, accountType: accountTypes[1] }).create();
        }
    }
}
