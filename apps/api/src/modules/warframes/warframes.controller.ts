import { Body, Controller, Get, Post } from '@nestjs/common';
import { WarframesService } from './warframes.service';

@Controller('warframes')
export class WarframesController {
  constructor(private readonly service: WarframesService) {}

  @Get('daily')
  getDailyWarframe() {
    return this.service.getDailyWarframe();
  }

  @Get('random')
  async getRandomWarframe() {
    return this.service.getRandomWarframe();
  }

  @Post('guess')
  async checkAnswer(@Body() body: { id: number; guess: string }) {
    return this.service.checkAnswer(body.id, body.guess);
  }
}
