import { Controller, Get } from '@nestjs/common';
import { AbilitiesService } from './abilities.service';

@Controller('abilities')
export class AbilitiesController {
  constructor(private readonly service: AbilitiesService) {}

  @Get('daily')
  getDailyAbility() {
    return this.service.getDailyAbility();
  }

  @Get('random')
  async getRandomAbility() {
    return this.service.getRandomAbility();
  }

  @Get('suggestions')
  async getAbilitiesSuggestions() {
    return this.service.getAbilitiesSuggestions();
  }
}
