import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  
} from 'typeorm';
import { User } from './User.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'review' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int', unsigned: true })
  rate: number;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
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

  @ManyToOne(() => User, (user) => user.reviews, { nullable: false })
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;
}
