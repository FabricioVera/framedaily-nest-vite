import { Injectable } from '@nestjs/common';
import { warframes } from '../database/schema/warframes.schema';
import { db } from '../data-source';
import { sql, eq, ilike } from 'drizzle-orm';
import { WarframeDto } from 'shared/src/dtos/warframe.dto';

@Injectable()
export class WarframesRepository {
  async countAll(): Promise<number> {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(warframes);
    return count;
  }

  async findById(id: number): Promise<Partial<WarframeDto>> {
    const [warframe] = await db
      .select()
      .from(warframes)
      .where(eq(warframes.id, id));
    if (!warframe) {
      throw new Error(`Warframe with id ${id} not found`);
    }
    return warframe;
  }

  async findByName(name: string): Promise<Partial<WarframeDto>> {
    const [warframe] = await db
      .select()
      .from(warframes)
      .where(ilike(warframes.name, name));
    if (!warframe) {
      throw new Error(`Warframe with name ${name} not found`);
    }
    return warframe;
  }
}
