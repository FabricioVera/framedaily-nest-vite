import { Injectable, NotFoundException } from '@nestjs/common';
import { warframes } from '../database/schema/warframes.schema';
import { WarframesRepository } from './warframes.repository';

@Injectable()
export class WarframeQuizService {
  constructor(private readonly warframesRepo: WarframesRepository) {}

  getDay(): any {
    return new Date().getDate();
  }

  getIndex(today: any, charactersLenght: number): number {
    return today % charactersLenght;
  }

  getYearComparison(
    guessYear: number,
    actualYear: number,
  ): 'lower' | 'equal' | 'higher' {
    if (guessYear < actualYear) return 'higher';
    if (guessYear > actualYear) return 'lower';
    return 'equal';
  }

  async getDailyWarframe() {
    const today = this.getDay();
    const length = await this.warframesRepo.countAll();
    const index = this.getIndex(today, length);
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
}
