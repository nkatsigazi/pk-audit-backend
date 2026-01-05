import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceController } from './compliance.controller';
import { ComplianceService } from './compliance.service';
import { ComplianceChecklist } from './entities/compliance-checklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComplianceChecklist])],
  controllers: [ComplianceController],
  providers: [ComplianceService],
})
export class ComplianceModule {}