import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewNotesController } from './review-notes.controller';
import { ReviewNotesService } from './review-notes.service';
import { ReviewNote } from './entities/review-note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewNote])],
  controllers: [ReviewNotesController],
  providers: [ReviewNotesService],
})
export class ReviewNotesModule {}