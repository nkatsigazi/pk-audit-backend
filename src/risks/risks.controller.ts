import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { RisksService } from './risks.service';

@Controller('engagements/:engagementId/risks')
export class RisksController {
  constructor(private risksService: RisksService) {}

  @Get()
  findAll(@Param('engagementId') engagementId: string) {
    return this.risksService.findByEngagement(+engagementId);
  }

  @Post()
  create(@Param('engagementId') engagementId: string, @Body() body: Partial<any>) {
    return this.risksService.create({ ...body, engagementId: +engagementId });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updates: Partial<any>) {
    return this.risksService.update(+id, updates);
  }
}