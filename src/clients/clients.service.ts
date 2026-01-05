import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.find({
      relations: ['engagements'],
    });
  }

  async findOne(id: number): Promise<Client | null> {
    return this.clientsRepository.findOne({
      where: { id },
      relations: ['engagements'],
    });
  }

  async create(data: Partial<Client>): Promise<Client> {
    const client = this.clientsRepository.create(data);
    return this.clientsRepository.save(client);
  }
}