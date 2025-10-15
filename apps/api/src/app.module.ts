import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WarframeQuizModule } from './warframe-quiz/warframe-quiz.module';

@Module({
  imports: [WarframeQuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
