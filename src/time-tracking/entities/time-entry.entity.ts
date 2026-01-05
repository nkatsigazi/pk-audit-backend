import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Engagement } from '../../engagements/entities/engagement.entity';
import { User } from '../../users/entities/user.entity';

@Entity('time_entries')
export class TimeEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 5, scale: 2 })
  hours: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => Engagement, (engagement) => engagement.id, { onDelete: 'CASCADE' })
  engagement: Engagement;

  @Column()
  engagementId: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;
}