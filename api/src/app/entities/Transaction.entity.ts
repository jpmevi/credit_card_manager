import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from './Account.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'transaction' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: "old_balance", type: 'decimal', precision: 10, scale: 2 })
  oldBalance: number;

  @Column({ name: "current_balance", type: 'decimal', precision: 10, scale: 2 })
  currentBalance: number;

  @Column({ type: 'enum', enum: ['increase', 'decrease'] })
  type: string;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @Column({ type: 'date' })
  doe: Date;

  @Column({ type: 'text' })
  log: string;



  @Column({ type: 'date' })
  date: Date;


  @ManyToOne(() => Account, (account) => account.accountLogs, { nullable: false })
  @JoinColumn({ name: "account_number", referencedColumnName: "number" })
  account: Account;
}
