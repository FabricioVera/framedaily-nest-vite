import { Controller, Get } from '@nestjs/common';
import { WarframeQuizService } from './warframe-quiz.service';
import type { Character } from './character';

@Controller('warframe-quiz')
export class WarframeQuizController {
  constructor(private readonly warframeQuizService: WarframeQuizService) {}

  @Get('daily')
  getDailyWarframe() {
    return this.warframeQuizService.getDailyWarframe();
  }

  @Get('random')
  async getRandomWarframe() {
    const warframe = await this.warframeQuizService.getRandomWarframe();
    return warframe;
  }
}
