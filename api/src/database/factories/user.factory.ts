import * as Faker from 'faker';
import { User } from 'src/app/entities/User.entity';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
    const user = new User();
    user.username = faker.internet.userName();
    user.cui = faker.random.alphaNumeric(10); // Puedes ajustar según tus necesidades
    user.email = faker.internet.email();
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.dob = faker.date.past(); // O ajusta según tus necesidades
    user.pin = faker.random.alphaNumeric(6); // Puedes ajustar según tus necesidades
    user.role = faker.random.arrayElement(["administrator", "customer"]);
    user.notifyMe = faker.random.boolean();
    user.reminder = faker.random.boolean();

    return user;
});
