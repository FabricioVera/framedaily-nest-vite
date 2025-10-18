import { Module } from '@nestjs/common';
import { WarframeQuizService } from './warframe-quiz.service';
import { WarframeQuizController } from './warframe-quiz.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [WarframeQuizService],
  controllers: [WarframeQuizController],
})
export class WarframeQuizModule {}
