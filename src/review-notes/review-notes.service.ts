import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewNote } from './entities/review-note.entity';

@Injectable()
export class ReviewNotesService {
  constructor(
    @InjectRepository(ReviewNote)
    private reviewNotesRepo: Repository<ReviewNote>,
  ) {}

  async findAllByEngagement(engagementId: number): Promise<ReviewNote[]> {
    return this.reviewNotesRepo.find({
      where: { engagementId },
      order: { createdAt: 'DESC' },
    });
  }

  async create(engagementId: number, data: Partial<ReviewNote>): Promise<ReviewNote> {
    const note = this.reviewNotesRepo.create({
      ...data,
      engagementId,
    });
    return this.reviewNotesRepo.save(note);
  }

  async update(id: number, updates: Partial<ReviewNote>): Promise<ReviewNote> {
    await this.reviewNotesRepo.update(id, updates);

    const updated = await this.reviewNotesRepo.findOneBy({ id });

    if (!updated) {
        throw new NotFoundException(`Review note with ID ${id} not found`);
    }

    return updated;
  }
}