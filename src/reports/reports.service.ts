import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable()
export class ReportsService {

  async generateSummaryPdf(engagementId: number): Promise<Buffer> {
    // Gather data (mock)
    const docDefinition = {
      content: [
        { text: `Summary for Engagement ${engagementId}`, style: 'header' },
        'Key findings...',
      ],
      styles: {
        header: { fontSize: 18, bold: true },
      },
    };

    return new Promise((resolve) => {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getBuffer((buffer: Buffer) => {
        resolve(buffer);
      });
    });
  }
}