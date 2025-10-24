import { pgTable, serial, varchar, integer, text } from 'drizzle-orm/pg-core';
import { warframes } from './warframes.schema';

export const abilities = pgTable('abilities', {
  id: serial('id').primaryKey(),
  warframeId: integer('warframe_id')
    .notNull()
    .references(() => warframes.id, { onDelete: 'cascade' }),
  uniqueName: varchar('unique_name', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  imageName: varchar('image_name', { length: 255 }),
});
