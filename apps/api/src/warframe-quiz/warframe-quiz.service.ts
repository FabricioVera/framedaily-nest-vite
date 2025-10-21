import { Injectable } from '@nestjs/common';
import { db } from '../data-source';
import { eq, sql } from 'drizzle-orm';
import { warframes } from '../database/schema/warframes.schema';
import { WarframeDto } from 'shared/src/dtos/warframe.dto';

@Injectable()
export class WarframeQuizService {
  getDay(): any {
    return new Date().getDate();
  }

  getIndex(today: any, charactersLenght: number): number {
    return today % charactersLenght;
  }

  async getDataLength(): Promise<number> {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(warframes);

    return count;
  }

  async getDailyWarframe() {
    const today = this.getDay();
    const length = await this.getDataLength();
    const index = this.getIndex(today, length);

    const [wf] = await db
      .select()
      .from(warframes)
      .where(sql`id = ${index}`);

    return wf;
  }

  async getRandomWarframe() {
    const length = await this.getDataLength();
    const randomId = Math.floor(Math.random() * length) + 1;

    const [wf] = await db
      .select()
      .from(warframes)
      .where(sql`id = ${randomId}`);

    return {
      id: wf.id,
      description: wf.description,
      type: wf.type,
      isPrime: wf.isPrime,
    };
  }

  async checkAnswer(id: number, guess: string) {
    const [wf] = await db.select().from(warframes).where(eq(warframes.id, id));

    if (!wf) return { correct: false, message: 'No se encontró el warframe.' };

    const correct = wf.name.toLowerCase() === guess.trim().toLowerCase();
    return {
      correct,
      correctName: wf.name,
    };
  }
}
