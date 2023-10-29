import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account.entity';

@Entity({ name: 'account_log' })
export class AccountLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  doe: Date;

  @Column({ type: 'text' })
  log: string;

  @Column({ type: 'enum', enum: ['enabled', 'disabled', 'created', 'deleted', 'rejected'] })
  status: string;

  @Column({ type: 'date' })
  date: Date;


  @ManyToOne(() => Account, (account) => account.accountLogs, { nullable: false })
  @JoinColumn({ name: "account_number", referencedColumnName: "number" })
  account: Account;
}
