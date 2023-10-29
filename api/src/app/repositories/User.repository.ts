import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User.entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> { }
// TODO: Create custom query and row query
