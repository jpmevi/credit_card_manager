import * as Faker from 'faker';
import { Review } from 'src/app/entities/Review.entity';
import { User } from 'src/app/entities/User.entity';
import { define } from 'typeorm-seeding';

define(Review, (faker: typeof Faker, context: { user: User }) => {
    const review = new Review();
    review.comment = faker.lorem.words(10);
    review.rate = faker.random.number({ min: 1, max: 5 });
    review.user = context.user
    return review;
});
