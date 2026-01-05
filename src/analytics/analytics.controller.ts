import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private service: AnalyticsService) {}

  @Get(':engagementId/ratios')
  getRatios(@Param('engagementId') id: string) {
    return this.service.getFinancialRatios(+id);
  }

  @Get(':engagementId/benford')
  getBenford(@Param('engagementId') id: string) {
    return this.service.benfordsLawAnalysis(+id);
  }

  @Get(':engagementId/tests')
  getTests(@Param('engagementId') id: string) {
    return this.service.automatedTests(+id);
  }
}