import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Engagement } from './entities/engagement.entity';
import { CreateEngagementDto } from './dto/create-engagement.dto';
import { Client } from '../clients/entities/client.entity';
import { AuditProgram } from '../audit-programs/entities/audit-program.entity';
import { Task } from '../tasks/entities/task.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class EngagementsService {
  constructor(
    @InjectRepository(Engagement)
    private engagementsRepository: Repository<Engagement>,
    private emailService: EmailService,
  ) {}

  async findAll(): Promise<Engagement[]> {
    return this.engagementsRepository.find({
      relations: ['client'],
    });
  }

  async findOne(id: number): Promise<Engagement> {
    const engagement = await this.engagementsRepository.findOne({
      where: { id },
      relations: ['client'],
    });

    if (!engagement) {
      throw new NotFoundException(`Engagement with ID ${id} not found`);
    }

    return engagement;
  }

  async create(dto: CreateEngagementDto): Promise<Engagement> {
    // 🔹 Fetch client
    const client = await this.engagementsRepository.manager.findOne(Client, {
      where: { id: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${dto.clientId} not found`);
    }

    // 🔹 Create engagement
    const engagement = this.engagementsRepository.create({
      year: dto.year,
      type: dto.type,
      status: 'Draft',
      client,
      clientName: client.name,
    });

    // 🔹 Save FIRST (we need the ID)
    const savedEngagement = await this.engagementsRepository.save(engagement);
    // Workflow automation: notify on create
    this.emailService.sendNotification('new_engagement', savedEngagement);

    // 🔹 Attach audit program & auto-seed checklist
    if (dto.auditProgramId) {
      const program = await this.engagementsRepository.manager.findOne(AuditProgram, {
        where: { id: dto.auditProgramId },
        relations: ['defaultItems'],
      });

      if (!program) {
        throw new NotFoundException(
          `Audit program with ID ${dto.auditProgramId} not found`,
        );
      }

      savedEngagement.auditProgramId = program.id;
      savedEngagement.auditProgramName = program.name;

      //await this.engagementsRepository.save(savedEngagement);
      await this.engagementsRepository.manager.save(Task, { description: 'Initial Planning', engagementId: savedEngagement.id, deadline: new Date() });

      // 🔹 Seed checklist items
      for (const item of program.defaultItems) {
        await this.engagementsRepository.manager.insert('checklist_items', {
          description: item.description,
          section: item.section,
          checked: false,
          engagementId: savedEngagement.id,
        });
      }
    }

    return this.findOne(savedEngagement.id);
  }

  async updateStatus(id: number, status: string): Promise<Engagement> {
    const result = await this.engagementsRepository.update(id, { status });

    if (result.affected === 0) {
      throw new NotFoundException(`Engagement with ID ${id} not found`);
    }

    // Automation: if completed, trigger billing
    if (status === 'Completed') {
      this.emailService.sendNotification('engagement_completed', { id });
    }

    return this.findOne(id);
  }

  async getProgress(id: number): Promise<number> {
    //const tasks = await this.engagementsRepository.manager.find(Task, { where: { engagementId: id } });
    const tasks = await this.engagementsRepository.manager.find(Task, {
      where: { engagement: { id: id } },  // Assuming the relation is "engagement"
    });
    const completed = tasks.filter(t => t.completed).length;
    return tasks.length ? (completed / tasks.length) * 100 : 0;
  }

  // Integration stub: pull from QuickBooks
  async integrateFinancialData(id: number, apiKey: string) {
    // Mock: fetch data
    return { status: 'integrated' };
  }

}
