import { Controller, Get, Param } from '@nestjs/common';
import { AuditProgramsService } from './audit-programs.service';

@Controller('audit-programs')
export class AuditProgramsController {
  constructor(private readonly auditProgramsService: AuditProgramsService) {}

  @Get()
  findAll() {
    return this.auditProgramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditProgramsService.findOne(+id);
  }
}