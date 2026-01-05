import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import type { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private service: ReportsService) {}

  @Get(':engagementId/summary')
  async getSummary(@Param('engagementId') id: string, @Res() res: Response) {
    const pdfBuffer = await this.service.generateSummaryPdf(+id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=summary.pdf',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}