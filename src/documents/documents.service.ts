import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  async uploadFile(file): Promise<any> {
    const uploadPath = path.join(__dirname, '..', 'uploads', file.originalname);
    fs.writeFileSync(uploadPath, file.buffer);
    return { message: 'File uploaded successfully' };
  }

  async createTemplate(templateData: { name: string; description: string }) {
    // Logic for creating template, like saving it to DB or file system
    return { message: 'Template created successfully', templateData };
  }
}
