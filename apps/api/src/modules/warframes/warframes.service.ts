import { Injectable, NotFoundException } from '@nestjs/common';
import { WarframesRepository } from './warframes.repository';
import { UtilsService } from '../../utils/utils.service';
import { WarframeDto } from 'shared/src/dtos/warframe.dto';
import { compareWarframes } from './checkAnswer/checkAnswer.utils';

@Injectable()
export class WarframesService {
  constructor(
    private readonly warframesRepo: WarframesRepository,
    private utilities: UtilsService,
  ) {}

  async getDailyWarframe() {
    const length = await this.warframesRepo.countAll();
    const index = this.utilities.getDailyRandomNumber(
      0,
      length,
      'warframe-of-the-day',
    );
    return await this.warframesRepo.findById(index);
  }

  async getRandomWarframe() {
    const length = await this.warframesRepo.countAll();
    const randomId = Math.floor(Math.random() * length) + 1;
    return await this.warframesRepo.findById(randomId);
  }

  async checkAnswer(id: number, guess: string) {
    const guessedWarframe = await this.warframesRepo.findByName(guess);
    const dailyWarframe = await this.warframesRepo.findById(id);

    const fieldMatches = compareWarframes(guessedWarframe, dailyWarframe);

    return {
      ...guessedWarframe,
      correct: fieldMatches.name === 'exact',
      fieldMatches,
    };
  }

  async getWarframeSuggestions(): Promise<Partial<WarframeDto>[]> {
    return await this.warframesRepo.getAllRowsByColumns([
      'name',
      'thumbnailUrl',
    ]);
  }
}
