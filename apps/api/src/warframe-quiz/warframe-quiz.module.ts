import { Module } from '@nestjs/common';
import { WarframeQuizService } from './warframe-quiz.service';
import { WarframeQuizController } from './warframe-quiz.controller';

@Module({
  providers: [WarframeQuizService],
  controllers: [WarframeQuizController]
})
export class WarframeQuizModule {}
