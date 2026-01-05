import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ComplianceService } from './compliance.service';

@Controller('compliance')
export class ComplianceController {
  constructor(private service: ComplianceService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: Partial<any>) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updates: Partial<any>) {
    return this.service.update(+id, updates);
  }
}