import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('audit_programs')
export class AuditProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('text')
  description: string;

  @Column('jsonb')
  defaultItems: { description: string; section: string }[];
}