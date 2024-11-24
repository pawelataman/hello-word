import { config } from 'dotenv';

export function createDbUrl(): string {
  config();
  return `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DB}`;
}
