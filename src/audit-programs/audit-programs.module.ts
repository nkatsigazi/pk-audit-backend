import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditProgramsController } from './audit-programs.controller';
import { AuditProgramsService } from './audit-programs.service';
import { AuditProgram } from './entities/audit-program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditProgram])],
  controllers: [AuditProgramsController],
  providers: [AuditProgramsService],
})
export class AuditProgramsModule {}