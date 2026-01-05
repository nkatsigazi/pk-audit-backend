import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrialBalanceController } from './trial-balance.controller';
import { TrialBalanceService } from './trial-balance.service';
import { TrialBalance } from './entities/trial-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrialBalance])],
  controllers: [TrialBalanceController],
  providers: [TrialBalanceService],
})
export class TrialBalanceModule {}