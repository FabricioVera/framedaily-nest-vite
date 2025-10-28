import { Injectable, NotFoundException } from '@nestjs/common';
import { WarframesRepository } from './warframes.repository';
import { UtilsService } from '../../utils/utils.service';
import { WarframeDto } from 'shared/src/dtos/warframe.dto';

@Injectable()
export class WarframesService {
  constructor(
    private readonly warframesRepo: WarframesRepository,
    private utilities: UtilsService,
  ) {}

  getYearComparison(
    guessYear: number,
    actualYear: number,
  ): 'lower' | 'equal' | 'higher' {
    if (guessYear < actualYear) return 'higher';
    if (guessYear > actualYear) return 'lower';
    return 'equal';
  }

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

    const compareField = (field: keyof typeof guessedWarframe) =>
      guessedWarframe[field]?.toString().trim().toLowerCase() ===
      dailyWarframe[field]?.toString().trim().toLowerCase();

    const fieldMatches = {
      name: compareField('name'),
      type: compareField('type'),
      aura: compareField('aura'),
      releaseYear: this.getYearComparison(
        guessedWarframe.releaseYear!,
        dailyWarframe.releaseYear!,
      ),
      isPrime: guessedWarframe.isPrime === dailyWarframe.isPrime,
    };

    const correct = fieldMatches.name;

    return { ...guessedWarframe, correct, fieldMatches };
  }

  async getWarframeSuggestions(): Promise<Partial<WarframeDto>[]> {
    return await this.warframesRepo.getAllRowsByColumns([
      'name',
      'thumbnailUrl',
    ]);
  }
}
