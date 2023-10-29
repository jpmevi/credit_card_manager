import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Currency } from './Currency.entity';

@Entity({ name: 'account_type' })
export class AccountType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ["gold", "normal"], default: "normal" })
  type: string;

  @Column({ name: "default_limit", type: 'decimal', precision: 10, scale: 2 })
  defaultLimit: number;

  @OneToOne(() => Currency, { nullable: false })
  @JoinColumn({ name: "id_currency" })
  currency: Currency;
}
