import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { createDbUrl } from './utils/db-url';

const migrationClient = postgres(createDbUrl(), { max: 1 });
const db = drizzle({ client: migrationClient });

async function runMigration() {
  await migrate(db, {
    migrationsFolder: './src/common/db/migrations/',
  });

  await migrationClient.end();
}

runMigration()
  .then(() => console.log('Migration successful'))
  .catch(console.error);
