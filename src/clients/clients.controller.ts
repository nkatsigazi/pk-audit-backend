import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Client>) {
    return this.clientsService.create(data);
  }
}