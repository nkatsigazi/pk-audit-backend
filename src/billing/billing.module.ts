import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { Invoice } from './entities/invoice.entity';
import { TimeEntry } from '../time-tracking/entities/time-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, TimeEntry])],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}