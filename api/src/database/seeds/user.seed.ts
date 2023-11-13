import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../app/entities/User.entity';
import { Account } from '../../app/entities/Account.entity';
import { AccountType } from '../../app/entities/AccountType.entity';
import { Currency } from '../../app/entities/Currency.entity';
import { Transaction } from '../../app/entities/Transaction.entity';
import { Review } from '../../app/entities/Review.entity';

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
            const normalAccount = await factory(Account)({ user, accountType: accountTypes[0] }).create();
            const goldAccount = await factory(Account)({ user, accountType: accountTypes[1] }).create();
            await factory(Transaction)({ account: normalAccount }).createMany(50);
            await factory(Transaction)({ account: goldAccount }).createMany(50);
            await factory(Review)({ user: user }).createMany(2);
        }
    }
}
