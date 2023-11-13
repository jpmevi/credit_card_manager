import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Review } from './Review.entity';
import { Account } from './Account.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 45 })
  cui: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ name: "first_name", type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: "last_name", type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'text'})
  pin: string;

  @Column({ type: 'enum', enum: ["administrator", "customer"], default: "customer" })
  role: string;

  @Column({ name: "notify_me", type: 'bool', default: true })
  notifyMe: boolean;

  @Column({ type: 'bool', default: true })
  reminder: boolean;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[]

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[]
}
