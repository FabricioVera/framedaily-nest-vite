import { Body, Controller, Get, Post } from '@nestjs/common';
import { WarframeQuizService } from './warframe-quiz.service';

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

  @Post('guess')
  async checkAnswer(@Body() body: { id: number; guess: string }) {
    return this.warframeQuizService.checkAnswer(body.id, body.guess);
  }
}
