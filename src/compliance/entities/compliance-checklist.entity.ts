import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('compliance_checklists')
export class ComplianceChecklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('jsonb')
  items: { description: string; checked: boolean }[];
}