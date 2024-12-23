import { Injectable } from "@nestjs/common";
import { DbProviderService } from "../common/db/database.service";
import { sql } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { SelectWordsScheme } from "../common/db/schema/words";

@Injectable()
export class QuizRepository {
  private readonly db: PostgresJsDatabase;

  constructor(readonly dbService: DbProviderService) {
    this.db = dbService.dbInstance;
  }

  getRandomWords(numOfWords: number) {
    return this.db.execute<Record<string, SelectWordsScheme>>(
      sql`SELECT *
                FROM words
                ORDER BY RANDOM()
                LIMIT ${numOfWords};`,
    );
  }
}
