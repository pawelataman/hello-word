import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const words = pgTable('words', {
  id: serial().primaryKey(),
  categoryId: integer()
    .notNull()
    .references(() => wordsCategories.id),
  en: varchar({ length: 255 }).notNull(),
  pl: varchar({ length: 255 }).notNull(),
});

export type InsertWordsScheme = InferInsertModel<typeof words>;
export type SelectWordsScheme = InferSelectModel<typeof words>;

export const wordsCategories = pgTable('words_categories', {
  id: serial().primaryKey(),
  categoryName: varchar({ length: 255 }).notNull(),
});

export type InsertWordsCategoriesScheme = InferInsertModel<
  typeof wordsCategories
>;
export type SelectWordsCategoriesScheme = InferSelectModel<
  typeof wordsCategories
>;
