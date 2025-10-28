import { Injectable } from '@nestjs/common';
import { abilities } from '../../database/schema';
import { db } from '../../data-source';
import { sql, eq, ilike } from 'drizzle-orm';
import { AbilitiesDto } from 'shared/src/dtos/abilities.dto';

@Injectable()
export class AbilitiesRepository {
  async countAll(): Promise<number> {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(abilities);
    return count;
  }

  async findById(id: number): Promise<AbilitiesDto> {
    const [ability] = await db
      .select()
      .from(abilities)
      .where(eq(abilities.id, id));
    if (!abilities) {
      throw new Error(`Ability with id ${id} not found`);
    }
    return ability;
  }

  async findByName(name: string): Promise<AbilitiesDto> {
    const [ability] = await db
      .select()
      .from(abilities)
      .where(ilike(abilities.name, name));
    if (!abilities) {
      throw new Error(`Ability with name ${name} not found`);
    }
    return ability;
  }

  async getAllRowsByColumns(
    columns: (keyof typeof abilities)[],
  ): Promise<Partial<AbilitiesDto>[]> {
    // Filtramos solo las columnas válidas que existen en el schema
    const selectedColumnsEntries = columns
      .filter((col) => abilities[col as keyof typeof abilities] !== undefined)
      .map((col) => [col, abilities[col as keyof typeof abilities]]);

    const selectedColumns = Object.fromEntries(selectedColumnsEntries);

    const result = await db.select(selectedColumns).from(abilities);
    return result;
  }
}
