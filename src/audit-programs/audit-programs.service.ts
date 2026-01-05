import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditProgram } from './entities/audit-program.entity';

@Injectable()
export class AuditProgramsService {
  constructor(
    @InjectRepository(AuditProgram)
    private auditProgramsRepo: Repository<AuditProgram>,
  ) {}

  findAll(): Promise<AuditProgram[]> {
    return this.auditProgramsRepo.find();
  }

  async findOne(id: number): Promise<AuditProgram> {
    const program = await this.auditProgramsRepo.findOneBy({ id });

    if (!program) {
      throw new NotFoundException(`Audit program with ID ${id} not found`);
    }

    return program;
  }
}