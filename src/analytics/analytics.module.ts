import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TrialBalance } from '../trial-balance/entities/trial-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrialBalance])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}