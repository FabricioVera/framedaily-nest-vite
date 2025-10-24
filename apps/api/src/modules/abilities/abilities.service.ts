import { Injectable } from '@nestjs/common';
import { AbilitiesRepository } from './abilities.repository';
import { UtilsService } from '../../utils/utils.service';

@Injectable()
export class AbilitiesService {
  constructor(
    private readonly abilitiesRepo: AbilitiesRepository,
    private utilities: UtilsService,
  ) {}

  async getDailyAbility() {
    const length = await this.abilitiesRepo.countAll();
    const index = this.utilities.getDailyRandomNumber(
      0,
      length,
      'ability-of-the-day',
    );
    return await this.abilitiesRepo.findById(index);
  }

  async getRandomAbility() {
    const length = await this.abilitiesRepo.countAll();
    const randomId = Math.floor(Math.random() * length) + 1;
    return await this.abilitiesRepo.findById(randomId);
  }
}
