import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';

@Controller('engagements/:engagementId/time-tracking')
export class TimeTrackingController {
  constructor(private service: TimeTrackingService) {}

  @Get()
  findAll(@Param('engagementId') engagementId: string) {
    return this.service.findByEngagement(+engagementId);
  }

  @Post()
  create(@Param('engagementId') engagementId: string, @Body() body: { hours: number, userId: number }) {
    return this.service.create(+engagementId, body.hours, body.userId);
  }
}