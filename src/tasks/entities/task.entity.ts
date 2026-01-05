import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Engagement } from '../../engagements/entities/engagement.entity';
import { User } from '../../users/entities/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ default: 'Low' })
  priority: 'Low' | 'Medium' | 'High';

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User)
  assignedTo: User;

  @ManyToOne(() => Engagement, { onDelete: 'CASCADE' })
  engagement: Engagement;
}