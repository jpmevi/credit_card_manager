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
    // Crear un usuario administrador

    const adminUser = await factory(User)().create({
      username: 'admin',
      cui: '1234567890101',
      email: 'admin@creditcardmanager.com',
      firstName: 'admin',
      lastName: 'admin',
      dob: new Date('2000-01-01'),
      pin: 'admin',
      role: 'administrator',
      notifyMe: false,
      reminder: false,
    });

    const paymentGatewayUser = await factory(User)().create({
      username: 'payment-gateway',
      cui: '1234567890101',
      email: 'payment@creditcardmanager.com',
      firstName: 'Pasarela',
      lastName: 'de Pago',
      dob: new Date('2000-01-01'),
      pin: 'admin',
      role: 'customer',
      notifyMe: false,
      reminder: false,
    });
    const ecommerceUser = await factory(User)().create({
      username: 'frikistuff',
      cui: '1234567890101',
      email: 'ecommerce1@creditcardmanager.com',
      firstName: 'Ecommerce',
      lastName: 'Frikistuff',
      dob: new Date('2000-01-01'),
      pin: 'admin',
      role: 'customer',
      notifyMe: false,
      reminder: false,
    });

    const ecommerceUser2 = await factory(User)().create({
      username: 'jaazstoreshop',
      cui: '1234567890101',
      email: 'ecommerce2@creditcardmanager.com',
      firstName: 'Ecommerce',
      lastName: 'JaazStoreShop',
      dob: new Date('2000-01-01'),
      pin: 'admin',
      role: 'customer',
      notifyMe: false,
      reminder: false,
    });
    const users = await factory(User)().createMany(10);

    const currencies = await Promise.all([
      factory(Currency)({ type: 'dollar' }).create(),
      factory(Currency)({ type: 'quetzal' }).create(),
    ]);

    const accountTypes = await Promise.all([
      factory(AccountType)({ type: 'gold', currency: currencies[0] }).create(),
      factory(AccountType)({
        type: 'normal',
        currency: currencies[1],
      }).create(),
    ]);

    for (const user of users) {
      const normalAccount = await factory(Account)({
        user,
        accountType: accountTypes[0],
      }).create({
        rejections: Math.floor(Math.random() * 4), // Genera un límite aleatorio entre 0 y 3
      });
      const goldAccount = await factory(Account)({
        user,
        accountType: accountTypes[1],
      }).create({
        rejections: Math.floor(Math.random() * 4), // Genera un límite aleatorio entre 0 y 3
      });
      await factory(Transaction)({ account: normalAccount }).createMany(50);
      await factory(Transaction)({ account: goldAccount }).createMany(50);
      await factory(Review)({ user: user }).createMany(2);
    }

    const goldAccountAdmin = await factory(Account)({
      user: adminUser,
      accountType: accountTypes[0],
    }).create({
      number: '1111111111111',
      cvv: '123',
      rejections: 0, // Establecer un límite específico para el administrador
    });

    const normalAccountAdmin = await factory(Account)({
      user: adminUser,
      accountType: accountTypes[1],
    }).create({
      number: '2222222222222',
      cvv: '456',
      rejections: 0, // Establecer un límite específico para el administrador
    });

    await factory(Transaction)({ account: normalAccountAdmin }).createMany(10);
    await factory(Transaction)({ account: goldAccountAdmin }).createMany(10);

    const normalAccountPaymentGatewayUser = await factory(Account)({
      user: paymentGatewayUser,
      accountType: accountTypes[1],
    }).create({
      number: '3333333333333',
      cvv: '123',
      rejections: 0,
    });

    const goldAccountPaymentGatewayUser = await factory(Account)({
      user: paymentGatewayUser,
      accountType: accountTypes[0],
    }).create({
      number: '4444444444444',
      cvv: '456',
      rejections: 0,
    });

    await factory(Transaction)({
      account: normalAccountPaymentGatewayUser,
    }).createMany(10);
    await factory(Transaction)({
      account: goldAccountPaymentGatewayUser,
    }).createMany(10);

    // Crear cuentas para ecommerceUser

    const normalAccountEcommerceUser = await factory(Account)({
      user: ecommerceUser,
      accountType: accountTypes[1],
    }).create({
      number: '5555555555555',
      cvv: '123',
      rejections: 0,
    });

    const goldAccountEcommerceUser = await factory(Account)({
      user: ecommerceUser,
      accountType: accountTypes[0],
    }).create({
      number: '6666666666666',
      cvv: '456',
      rejections: 0,
    });

    await factory(Transaction)({
      account: normalAccountEcommerceUser,
    }).createMany(10);
    await factory(Transaction)({
      account: goldAccountEcommerceUser,
    }).createMany(10);

    // Crear cuentas para ecommerceUser2

    const normalAccountEcommerceUser2 = await factory(Account)({
      user: ecommerceUser2,
      accountType: accountTypes[1],
    }).create({
      number: '7777777777777',
      cvv: '123',
      rejections: 0,
    });

    const goldAccountEcommerceUser2 = await factory(Account)({
      user: ecommerceUser2,
      accountType: accountTypes[0],
    }).create({
      number: '8888888888888',
      cvv: '456',
      rejections: 0,
    });

    await factory(Transaction)({
      account: normalAccountEcommerceUser2,
    }).createMany(10);
    await factory(Transaction)({
      account: goldAccountEcommerceUser2,
    }).createMany(10);

    // Crear revisiones para usuarios
    await factory(Review)({ user: adminUser }).createMany(2);
    await factory(Review)({ user: paymentGatewayUser }).createMany(2);
    await factory(Review)({ user: ecommerceUser }).createMany(2);
    await factory(Review)({ user: ecommerceUser2 }).createMany(2);
  }
}
