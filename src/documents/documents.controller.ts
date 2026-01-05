import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';


@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return await this.documentsService.uploadFile(file);
  }

  @Post('template')
  async createTemplate(@Body() templateData: { name: string; description: string }) {
    return this.documentsService.createTemplate(templateData);
  }
}