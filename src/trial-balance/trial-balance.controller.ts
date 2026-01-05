import { Controller, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { TrialBalanceService } from './trial-balance.service';

@Controller('engagements/:engagementId/trial-balance')
export class TrialBalanceController {
  constructor(private readonly tbService: TrialBalanceService) {}

  @Post('upload')
    async upload(
    @Param('engagementId') engagementIdStr: string,
    @Body('rows') rows: any[],
  ) {
    const engagementId = parseInt(engagementIdStr, 10);
    if (isNaN(engagementId)) {
        throw new BadRequestException('Invalid engagement ID');
    }
    return this.tbService.upload(engagementId, rows);
  }
}