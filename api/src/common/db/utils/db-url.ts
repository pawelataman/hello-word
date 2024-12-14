import {config} from 'dotenv';

export function createDbUrl(): string {
  config();
  return process.env.DB_URL
}
