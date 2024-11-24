import { Global, Module } from '@nestjs/common';
import { DbProviderService } from './db/database.service';

@Global()
@Module({
  providers: [DbProviderService],
  exports: [DbProviderService],
})
export class CommonModule {}
