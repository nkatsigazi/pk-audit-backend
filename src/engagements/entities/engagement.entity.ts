import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity('engagements')
export class Engagement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string; // keep for display/search until we fully migrate

  @Column()
  year: string;

  @Column()
  type: string;

  @Column({ default: 'Draft' })
  status: string;

  // Relationship to Client
  @ManyToOne(() => Client, (client) => client.engagements, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column({ nullable: true })
  clientId: number;

  @Column({ nullable: true })
  auditProgramId: number;

  @Column({ nullable: true })
  auditProgramName: string;
}