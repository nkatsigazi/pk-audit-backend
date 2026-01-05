import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { ChecklistItem } from '../engagements/entities/checklist-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistItem])],
  controllers: [ChecklistController],
  providers: [ChecklistService],
})
export class ChecklistModule {}