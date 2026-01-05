import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeEntry } from '../time-tracking/entities/time-entry.entity';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(TimeEntry) private timeRepo: Repository<TimeEntry>,
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
  ) {}

  async generateInvoice(engagementId: number) {
    const entries = await this.timeRepo.find({ where: { engagementId } });
    const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
    const rate = 100; // Demo rate
    const amount = totalHours * rate;
    const invoice = this.invoiceRepo.create({ amount, engagementId, status: 'Pending' });
    await this.invoiceRepo.save(invoice);
    return { id: invoice.id, amount, totalHours };
  }
}