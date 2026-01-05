import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientDocument } from './entities/client-document.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ClientPortalService {
  constructor(
    @InjectRepository(ClientDocument) private docRepo: Repository<ClientDocument>,
    @InjectRepository(Message) private msgRepo: Repository<Message>,
  ) {}

  getDocuments(clientId: number) {
    return this.docRepo.find({ where: { clientId } });
  }

  async uploadDocument(clientId: number, { name, data }: { name: string; data: string }) {
    const doc = this.docRepo.create({ name, data, clientId });
    return this.docRepo.save(doc);
  }

  getMessages(clientId: number) {
    return this.msgRepo.find({ where: { clientId }, order: { createdAt: 'DESC' } });
  }

  async sendMessage(clientId: number, text: string) {
    const msg = this.msgRepo.create({ text, clientId, createdAt: new Date() });
    return this.msgRepo.save(msg);
  }
}