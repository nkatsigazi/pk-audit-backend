import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementsController } from './engagements.controller';
import { EngagementsService } from './engagements.service';
import { Engagement } from './entities/engagement.entity';
import { Client } from '../clients/entities/client.entity';
import { EmailModule } from '../email/email.module';
import { AuditProgram } from '../audit-programs/entities/audit-program.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Engagement, Client, AuditProgram]),
    EmailModule,
  ],
  controllers: [EngagementsController],
  providers: [EngagementsService],
  exports: [EngagementsService],
})
export class EngagementsModule {}