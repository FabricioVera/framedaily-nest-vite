import { Controller, Get } from '@nestjs/common';
import { WarframeQuizService } from './warframe-quiz.service';
import type { Character } from './character';

@Controller('warframe-quiz')
export class WarframeQuizController {
    constructor(private readonly warframeQuizService: WarframeQuizService) {}

    @Get('daily')
    getDailyWarframe(): Character {
        return this.warframeQuizService.getDailyWarframe();
    }
}
