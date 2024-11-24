import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  username: varchar({ length: 255 }).notNull(),
});

export type InsertUserSchema = InferInsertModel<typeof users>;
export type SelectUserSchema = InferSelectModel<typeof users>;
