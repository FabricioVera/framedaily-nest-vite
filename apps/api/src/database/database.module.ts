import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { db } from '../data-source';

@Global()
@Module({
  providers: [
    {
      provide: 'DRIZZLE',
      useValue: db,
    },
    DatabaseService,
  ],
  exports: ['DRIZZLE'],
})
export class DatabaseModule {}
