import { Injectable } from '@nestjs/common';
import { DbProviderService } from '../common/db/database.service';
import { sql } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

@Injectable()
export class QuizRepository {
  private readonly db: PostgresJsDatabase;
  constructor(readonly dbService: DbProviderService) {
    this.db = dbService.dbInstance;
  }

  // getWords(): Promise<SelectWordsScheme[]> {
  //   return this.db.select().from(words);
  // }
  //
  // getCategories(): Promise<SelectWordsCategoriesScheme[]> {
  //   return this.db.select().from(wordsCategories);
  // }
  //
  // getWordsByCategoryId(categoryId: number): Promise<SelectWordsScheme[]> {
  //   return this.db.select().from(words).where(eq(words.categoryId, categoryId));
  // }

  getRandomWords(numOfWords: number) {
    return this.db.execute(
      sql`SELECT * FROM words ORDER BY RANDOM() LIMIT ${numOfWords};`,
    );
  }
}
