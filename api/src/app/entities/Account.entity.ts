import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
  BeforeInsert,
  OneToMany,
  Unique,
} from 'typeorm';
import { AccountType } from './AccountType.entity';
import { User } from './User.entity';
import * as bcrypt from 'bcrypt';
import { AccountLog } from './AccountLog.entity';
import { Transaction } from './Transaction.entity';

@Entity({ name: 'account' })
export class Account {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  number: string;

  @Column({ type: 'date' })
  doe: Date;

  @Column({ type: 'varchar', length: 255 })
  cvv: string;

  @Column({ type: 'enum', enum: ['enabled', 'disabled', 'deleted'], default: "enabled" })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  limit: number;

  @Column({ type: 'int', unsigned: true })
  rejections: number;

  @ManyToOne(() => User, (user) => user.accounts, { nullable: false })
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(type => AccountType, accountType => accountType.id, { nullable: false })
  @JoinColumn({ name: "id_account_type" })
  accountType: AccountType;

  @OneToMany(() => AccountLog, (accountLog) => accountLog.account)
  accountLogs: AccountLog[]

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[]

  @BeforeInsert()
  async hashPassword() {
    this.cvv = await bcrypt.hash(this.cvv, 10);
  }
}
