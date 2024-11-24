import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createDbUrl } from '../utils/db-url';
import { words, wordsCategories } from '../schema/words';

const migrationClient = postgres(createDbUrl(), { max: 1 });
const db = drizzle(migrationClient);

async function runTruncate() {
  await db.transaction(async (tx) => {
    await tx.delete(words);
    await tx.delete(wordsCategories);
  });

  await migrationClient.end();
}

runTruncate()
  .then(() => console.log('Truncate successful'))
  .catch(console.error);
