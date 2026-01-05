import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ClientPortalService } from './client-portal.service';
// Assume ClientAuthGuard
// @UseGuards(ClientAuthGuard)

@Controller('client-portal')
export class ClientPortalController {
  constructor(private service: ClientPortalService) {}

  @Get(':clientId/documents')
  getDocuments(@Param('clientId') clientId: string) {
    return this.service.getDocuments(+clientId);
  }

  @Post(':clientId/documents')
  uploadDocument(@Param('clientId') clientId: string, @Body() body: { name: string, data: string }) {
    return this.service.uploadDocument(+clientId, body);
  }

  @Get(':clientId/messages')
  getMessages(@Param('clientId') clientId: string) {
    return this.service.getMessages(+clientId);
  }

  @Post(':clientId/messages')
  sendMessage(@Param('clientId') clientId: string, @Body() body: { text: string }) {
    return this.service.sendMessage(+clientId, body.text);
  }
}