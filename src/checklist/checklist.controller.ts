import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { ChecklistItem } from '../engagements/entities/checklist-item.entity';

@Controller('engagements/:engagementId/checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Get()
  async findAll(@Param('engagementId') engagementId: string) {
    return this.checklistService.findAllByEngagement(+engagementId);
  }

  @Post()
  async create(
    @Param('engagementId') engagementId: string,
    @Body() body: Partial<ChecklistItem>,
  ) {
    return this.checklistService.create({ ...body, engagementId: +engagementId });
  }

  @Patch(':id')
  async update(
    @Param('engagementId') engagementId: string,
    @Param('id') id: string,
    @Body() updates: Partial<ChecklistItem>,
  ) {
    return this.checklistService.update(+id, updates);
  }
}