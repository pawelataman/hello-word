import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createDbUrl } from '../utils/db-url';
import { words, wordsCategories } from '../schema/words';
import { wordsData } from './words';
import { wordsCategoriesData } from './words-categories';

const migrationClient = postgres(createDbUrl(), { max: 1 });
const db = drizzle(migrationClient);

async function runSeed() {
  await db.transaction(async (tx) => {
    await tx.insert(wordsCategories).values(wordsCategoriesData);
    await tx.insert(words).values(wordsData);
  });

  await migrationClient.end();
}

runSeed()
  .then(() => console.log('Seed successful'))
  .catch(console.error);
