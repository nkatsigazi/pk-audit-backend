import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity('client_documents')
export class ClientDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  data: string; // base64

  @ManyToOne(() => Client, (client) => client.id, { onDelete: 'CASCADE' })
  client: Client;

  @Column()
  clientId: number;
}