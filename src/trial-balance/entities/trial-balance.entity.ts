import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Engagement } from '../../engagements/entities/engagement.entity';

@Entity('trial_balances')
export class TrialBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNo: string;

  @Column()
  accountName: string;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  debit: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  credit: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  balance: number;

  @ManyToOne(() => Engagement, engagement => engagement.id, { onDelete: 'CASCADE' })
  engagement: Engagement;

  @Column()
  engagementId: number;
}