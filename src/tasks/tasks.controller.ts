import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { EngagementsService } from '../engagements/engagements.service';

@Controller('engagements/:engagementId/tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private engagementsService: EngagementsService,
  ) {}

  @Get()
  findAll(@Param('engagementId') engagementId: string) {
    return this.tasksService.findByEngagement(+engagementId);
  }

  @Post()
  async create(@Param('engagementId') engagementId: string, @Body() body: Partial<any>) {
    const engagement = await this.engagementsService.findOne(+engagementId);

    return this.tasksService.create({ ...body, engagement });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updates: Partial<any>) {
    return this.tasksService.update(+id, updates);
  }
}