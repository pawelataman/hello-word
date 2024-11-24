import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/common/db/schema',
  out: './src/common/db/migrations',
  verbose: true,
  strict: true,
});
