import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrialBalance } from '../trial-balance/entities/trial-balance.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(TrialBalance)
    private tbRepo: Repository<TrialBalance>,
  ) {}

  async getFinancialRatios(engagementId: number) {
    const items = await this.tbRepo.find({ where: { engagementId } });
    const assets = items.filter(i => i.accountNo.startsWith('1')).reduce((sum, i) => sum + i.balance, 0);
    const liabilities = items.filter(i => i.accountNo.startsWith('2')).reduce((sum, i) => sum + i.balance, 0);
    const equity = items.filter(i => i.accountNo.startsWith('3')).reduce((sum, i) => sum + i.balance, 0);
    const revenue = items.filter(i => i.accountNo.startsWith('4')).reduce((sum, i) => sum + i.balance, 0);
    const expenses = items.filter(i => ['5', '6', '7', '8'].some(p => i.accountNo.startsWith(p))).reduce((sum, i) => sum + i.balance, 0);
    const currentRatio = liabilities !== 0 ? assets / liabilities : 0;
    const debtToEquity = equity !== 0 ? liabilities / equity : 0;
    const profitMargin = revenue !== 0 ? (revenue + expenses) / revenue : 0;
    return { currentRatio, debtToEquity, profitMargin };
  }

  async benfordsLawAnalysis(engagementId: number) {
    const items = await this.tbRepo.find({ where: { engagementId } });
    const balances = items.map(i => i.balance).filter(b => b !== 0);
    const digits = balances.map(b => parseInt(Math.abs(b).toString()[0], 10));
    const count = Array.from({ length: 9 }, () => 0);
    digits.forEach(d => count[d - 1]++);
    const total = digits.length;
    const observed = count.map(c => c / total);
    const expected = Array.from({ length: 9 }, (_, i) => Math.log10(1 + 1 / (i + 1)));
    const chiSquare = observed.reduce((sum, o, i) => sum + Math.pow(o - expected[i], 2) / expected[i], 0);
    const compliance = chiSquare < 15.507 ? 'High' : 'Low'; // Chi-square critical value for 8 df, alpha=0.05
    return { observed, expected, chiSquare, compliance };
  }

  async automatedTests(engagementId: number) {
    const items = await this.tbRepo.find({ where: { engagementId } });
    const sampleSize = Math.max(1, Math.floor(items.length * 0.1));
    const sample = items.sort(() => 0.5 - Math.random()).slice(0, sampleSize);
    const totalDebits = items.reduce((sum, i) => sum + i.debit, 0);
    const totalCredits = items.reduce((sum, i) => sum + i.credit, 0);
    const completeness = Math.abs(totalDebits - totalCredits) < 0.01;
    const existence = sample.every(i => i.balance !== null); // Demo
    return { sample: sample.map(i => i.id), assertions: { completeness, existence } };
  }
}