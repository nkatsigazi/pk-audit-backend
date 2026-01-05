import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Risk } from './entities/risk.entity';

@Injectable()
export class RisksService {
  constructor(
    @InjectRepository(Risk)
    private riskRepo: Repository<Risk>,
  ) {}

  findByEngagement(engagementId: number): Promise<Risk[]> {
    return this.riskRepo.find({ where: { engagementId } });
  }

  async create(risk: Partial<Risk>): Promise<Risk> {
    const newRisk = this.riskRepo.create(risk);
    return this.riskRepo.save(newRisk);
  }

  async update(id: number, updates: Partial<Risk>): Promise<Risk> {
    await this.riskRepo.update(id, updates);
    const updated = await this.riskRepo.findOneBy({ id });
    if (!updated) {
      throw new NotFoundException(`Risk with ID ${id} not found`);
    }
    return updated;
  }
}