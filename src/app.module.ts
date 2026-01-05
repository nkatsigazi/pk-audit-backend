import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementsModule } from './engagements/engagements.module';
import { ChecklistModule } from './checklist/checklist.module';
import { ClientsModule } from './clients/clients.module';
import { ReviewNotesModule } from './review-notes/review-notes.module';
import { AuditProgramsModule } from './audit-programs/audit-programs.module';
import { UsersModule } from './users/users.module';
import { TrialBalanceModule } from './trial-balance/trial-balance.module';
import { TasksModule } from './tasks/tasks.module';
import { RisksModule } from './risks/risks.module';
import { TimeTrackingModule } from './time-tracking/time-tracking.module';
import { BillingModule } from './billing/billing.module';
import { ClientPortalModule } from './client-portal/client-portal.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ReportsModule } from './reports/reports.module';
import { ComplianceModule } from './compliance/compliance.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    EngagementsModule,
    ChecklistModule,
    ClientsModule,
    ReviewNotesModule,
    AuditProgramsModule,
    UsersModule,
    TrialBalanceModule,
    TasksModule,
    RisksModule,
    TimeTrackingModule,
    BillingModule,
    ClientPortalModule,
    AnalyticsModule,
    ReportsModule,
    ComplianceModule,
    AuthModule,
    SocketModule,
  ],
})
export class AppModule {}