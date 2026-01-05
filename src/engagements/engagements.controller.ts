import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { EngagementsService } from './engagements.service';
import { CreateEngagementDto } from './dto/create-engagement.dto';
import { Engagement } from './entities/engagement.entity';

@Controller('engagements')
export class EngagementsController {
  constructor(private readonly engagementsService: EngagementsService) {}

  @Get()
  async findAll(): Promise<Engagement[]> {
    return this.engagementsService.findAll();
  }

  @Post()
  async create(
    @Body() createEngagementDto: CreateEngagementDto,
  ): Promise<Engagement> {
    return this.engagementsService.create(createEngagementDto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Engagement> {
    return this.engagementsService.updateStatus(+id, status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Engagement> {
    return this.engagementsService.findOne(+id);
  }

}