import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChecklistItem } from '../engagements/entities/checklist-item.entity';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(ChecklistItem)
    private checklistRepo: Repository<ChecklistItem>,
  ) {}

  async findAllByEngagement(engagementId: number): Promise<ChecklistItem[]> {
    return this.checklistRepo.find({
      where: { engagementId },
      order: { section: 'ASC', id: 'ASC' },
    });
  }

  async create(item: Partial<ChecklistItem>): Promise<ChecklistItem> {
    const newItem = this.checklistRepo.create(item);
    return this.checklistRepo.save(newItem);
  }

    async update(
        id: number,
        updates: Partial<ChecklistItem>,
    ): Promise<ChecklistItem> {
        await this.checklistRepo.update(id, updates);

        const item = await this.checklistRepo.findOneBy({ id });

        if (!item) {
            throw new NotFoundException(`Checklist item ${id} not found`);
        }

        return item;
    }
}