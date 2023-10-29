import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'currency' })
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ["dollar", "quetzal"], default: "quetzal" })
  type: string;

  @Column({ name: "exchange_type", type: 'decimal', precision: 10, scale: 2 })
  exchangeType: number;
}
