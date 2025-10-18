import { Injectable } from '@nestjs/common';
import { characters, type Character } from './character';
import { db } from '../data-source';
import { sql } from 'drizzle-orm';
import { warframes } from '../database/schema/warframes.schema';

@Injectable()
export class WarframeQuizService {
  getDay(): any {
    return new Date().getDate();
  }

  getIndex(today: any, charactersLenght: number): number {
    return today % charactersLenght;
  }

  async getDailyWarframe() {
    const today = this.getDay();
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(warframes);
    const index = this.getIndex(today, count);

    const [wf] = await db
      .select()
      .from(warframes)
      .where(sql`id = ${index}`);

    return wf;
  }

  async getRandomWarframe() {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(warframes);
    const randomId = Math.floor(Math.random() * count) + 1;

    const [wf] = await db
      .select()
      .from(warframes)
      .where(sql`id = ${randomId}`);

    return wf;
  }
}
