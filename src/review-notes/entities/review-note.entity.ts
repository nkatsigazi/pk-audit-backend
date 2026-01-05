import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Engagement } from '../../engagements/entities/engagement.entity';

@Entity('review_notes')
export class ReviewNote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  note: string;

  @Column({ default: 'Open' })
  status: 'Open' | 'Resolved';

  @Column()
  createdBy: string; // role or user name for demo

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Engagement, engagement => engagement.id, { onDelete: 'CASCADE' })
  engagement: Engagement;

  @Column()
  engagementId: number;
}