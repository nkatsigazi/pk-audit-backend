import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComplianceChecklist } from './entities/compliance-checklist.entity';

@Injectable()
export class ComplianceService {
  constructor(
    @InjectRepository(ComplianceChecklist)
    private repo: Repository<ComplianceChecklist>,
  ) {}

  findAll(): Promise<ComplianceChecklist[]> {
    return this.repo.find();
  }

  async create(data: Partial<ComplianceChecklist>): Promise<ComplianceChecklist> {
    const checklist = this.repo.create(data);
    return this.repo.save(checklist);
  }

  async update(id: number, updates: Partial<ComplianceChecklist>): Promise<ComplianceChecklist> {
    await this.repo.update(id, updates);
    
    const updated = await this.repo.findOneBy({ id });
    if (!updated) {
      throw new NotFoundException(`Checklist with ID ${id} not found`);
    }
    return updated;
  }
}