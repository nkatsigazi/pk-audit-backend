import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ReviewNotesService } from './review-notes.service';
import { ReviewNote } from './entities/review-note.entity';

@Controller('engagements/:engagementId/review-notes')
export class ReviewNotesController {
  constructor(private readonly reviewNotesService: ReviewNotesService) {}

  @Get()
  findAll(@Param('engagementId') engagementId: string) {
    return this.reviewNotesService.findAllByEngagement(+engagementId);
  }

  @Post()
  create(
    @Param('engagementId') engagementId: string,
    @Body() body: Partial<ReviewNote>,
  ) {
    return this.reviewNotesService.create(+engagementId, body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updates: Partial<ReviewNote>) {
    return this.reviewNotesService.update(+id, updates);
  }
}