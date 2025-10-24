import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  getDailyRandomNumber(min: number, max: number, id: string): number {
    const today = new Date();
    const dayTimestamp = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    // Simple hash of the day timestamp
    let seed = dayTimestamp + this.getStringHashCode(id);
    seed = (seed * 9301 + 49297) % 233280;
    const random = seed / 233280;

    return Math.floor(random * (max - min + 1)) + min;
  }

  getStringHashCode(string: string): number {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }
    return hash;
  }
}
