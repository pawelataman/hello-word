import { Injectable } from '@nestjs/common';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { createDbUrl } from './utils/db-url';
import * as postgres from 'postgres';

@Injectable()
export class DbProviderService {
  private readonly _dbInstance: PostgresJsDatabase;
  private readonly _dbClient: postgres.Sql;

  constructor() {
    this._dbClient = postgres(createDbUrl());
    this._dbInstance = drizzle({ logger: true, client: this._dbClient });
  }

  get dbInstance(): PostgresJsDatabase {
    return this._dbInstance;
  }
}
