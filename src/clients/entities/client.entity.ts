import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Engagement } from '../../engagements/entities/engagement.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  contactPerson: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(() => Engagement, (engagement) => engagement.client, {
    onDelete: 'SET NULL',
  })
  engagements: Engagement[];
}