import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Engagement } from '../../engagements/entities/engagement.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column({ default: 'Pending' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Engagement, (engagement) => engagement.id, { onDelete: 'SET NULL' })
  engagement: Engagement;

  @Column()
  engagementId: number;
}