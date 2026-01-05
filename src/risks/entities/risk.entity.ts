import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Engagement } from '../../engagements/entities/engagement.entity';

@Entity('risks')
export class Risk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column()
  severity: 'Low' | 'Medium' | 'High';

  @Column('text', { nullable: true })
  mitigation: string;

  @ManyToOne(() => Engagement, (engagement) => engagement.id, { onDelete: 'CASCADE' })
  engagement: Engagement;

  @Column()
  engagementId: number;
}