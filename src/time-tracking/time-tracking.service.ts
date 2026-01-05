import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeEntry } from './entities/time-entry.entity';

@Injectable()
export class TimeTrackingService {
  constructor(
    @InjectRepository(TimeEntry)
    private repo: Repository<TimeEntry>,
  ) {}

  findByEngagement(engagementId: number): Promise<TimeEntry[]> {
    return this.repo.find({ where: { engagementId } });
  }

  async create(engagementId: number, hours: number, userId: number): Promise<TimeEntry> {
    const entry = this.repo.create({ hours, engagementId, userId, date: new Date() });
    return this.repo.save(entry);
  }
}