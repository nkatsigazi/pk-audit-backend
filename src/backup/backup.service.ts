import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class BackupService {
  async backupDatabase() {
    // In prod, use pg_dump
    // Demo: copy a file
    await fs.copyFile('pk_audit_db.dump', `backup_${Date.now()}.dump`).catch(() => console.log('No dump file'));
    return 'Backup created';
  }
}