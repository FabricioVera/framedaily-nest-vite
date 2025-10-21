import { Module } from '@nestjs/common';
import { WarframeQuizService } from './warframe-quiz.service';
import { WarframeQuizController } from './warframe-quiz.controller';
import { DatabaseModule } from '../database/database.module';
import { WarframesRepository } from './warframes.repository';

@Module({
  imports: [DatabaseModule],
  providers: [WarframeQuizService, WarframesRepository],
  controllers: [WarframeQuizController],
})
export class WarframeQuizModule {}
