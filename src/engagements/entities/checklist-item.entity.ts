import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Engagement } from './engagement.entity';

export enum Section {
  PLANNING = 'Planning',
  RISK_ASSESSMENT = 'Risk Assessment',
  REVENUE = 'Revenue',
  PURCHASES = 'Purchases',
  PAYROLL = 'Payroll',
  INVENTORY = 'Inventory',
  FIXED_ASSETS = 'Fixed Assets',
  CASH_BANK = 'Cash & Bank',
  COMPLETION = 'Completion',
}

@Entity('checklist_items')
export class ChecklistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: false })
  checked: boolean;

  @Column({ nullable: true })
  notes: string;

  @Column({
    type: 'enum',
    enum: Section,
    default: Section.PLANNING,
  })
  section: Section;

  @ManyToOne(() => Engagement, (engagement) => engagement.id, { onDelete: 'CASCADE' })
  engagement: Engagement;

  @Column()
  engagementId: number;

  @Column('jsonb', { nullable: true, default: [] })
  attachedFiles: { name: string; data: string }[];
}