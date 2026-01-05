import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  findByEngagement(engagementId: number) {
    return this.taskRepo.find({ where: { engagement: { id: engagementId } }, relations: ['assignedTo'] });
  }

  create(task: Partial<Task>) {
    return this.taskRepo.save(this.taskRepo.create(task));
  }

  update(id: number, updates: Partial<Task>) {
    return this.taskRepo.update(id, updates);
  }
}