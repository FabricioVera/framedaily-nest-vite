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

    const correct =
      guessedWarframe.name?.trim().toLowerCase() ===
      dailyWarframe.name?.trim().toLowerCase();

    return { ...guessedWarframe, correct };
  }
}
