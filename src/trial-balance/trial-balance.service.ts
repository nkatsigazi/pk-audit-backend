import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrialBalance } from './entities/trial-balance.entity';

@Injectable()
export class TrialBalanceService {
  constructor(
    @InjectRepository(TrialBalance)
    private tbRepo: Repository<TrialBalance>,
  ) {}

  async upload(engagementId: number, rows: any[]): Promise<TrialBalance[]> {
    // Clear existing
    await this.tbRepo.delete({ engagementId });

    const items = rows.map(row => ({
      accountNo: row['Account No'] || row.accountNo || '',
      accountName: row['Account Description'] || row.accountName || '',
      debit: parseFloat(row.Debit || row.debit || 0),
      credit: parseFloat(row.Credit || row.credit || 0),
      balance: 0,
      engagementId,
    }));

    items.forEach(item => {
      item.balance = item.debit - item.credit;
    });

    return this.tbRepo.save(items);
  }

  async findByEngagement(engagementId: number) {
    return this.tbRepo.find({ where: { engagementId } });
  }

  async getAnalytics(engagementId: number) {
    const items = await this.findByEngagement(engagementId);

    const assets = items.filter(i => i.accountNo.startsWith('1')).reduce((sum, i) => sum + i.balance, 0);
    const liabilities = items.filter(i => i.accountNo.startsWith('2')).reduce((sum, i) => sum + i.balance, 0);
    const equity = items.filter(i => i.accountNo.startsWith('3')).reduce((sum, i) => sum + i.balance, 0);
    const revenue = items.filter(i => i.accountNo.startsWith('4')).reduce((sum, i) => sum + i.balance, 0);
    const expenses = items.filter(i => ['5', '6', '7', '8'].some(prefix => i.accountNo.startsWith(prefix))).reduce((sum, i) => sum + i.balance, 0);

    const profit = revenue + expenses; // expenses negative

    const materiality = Math.max(
      Math.abs(profit) * 0.05,
      Math.abs(assets) * 0.01,
      5000
    );

    const currentRatio = liabilities !== 0 ? assets / liabilities : 0;

    return {
      assets,
      liabilities,
      equity,
      revenue,
      expenses,
      profit,
      materiality,
      currentRatio: currentRatio.toFixed(2),
    };
  }
}