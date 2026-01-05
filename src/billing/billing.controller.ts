import { Controller, Get, Param } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private service: BillingService) {}

  @Get(':engagementId/invoice')
  async generateInvoice(@Param('engagementId') engagementId: string) {
    return await this.service.generateInvoice(+engagementId);
  }
}