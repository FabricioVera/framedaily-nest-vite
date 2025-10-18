import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  numeric,
  timestamp,
  text,
} from 'drizzle-orm/pg-core';

export const warframes = pgTable('warframes', {
  id: serial('id').primaryKey(),
  wikiaThumbnail: varchar('wikiaThumnail', { length: 500 }),
  name: varchar('name', { length: 150 }).notNull(),
  type: varchar('type', { length: 100 }),
  isPrime: boolean('is_prime').default(false),
  aura: varchar('aura', { length: 100 }),
  releaseYear: integer('release_year'),
  description: text('description'),
  health: integer('health'),
  armor: integer('armor'),
  shield: integer('shield'),
  sprintSpeed: numeric('sprint_speed', { precision: 4, scale: 2 }),
  releaseDate: varchar('release_date', { length: 20 }),
  imageName: varchar('image_name', { length: 500 }),
  wikiUrl: varchar('wiki_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
});
