import { Module } from '@nestjs/common';
import { WarframesService } from './warframes.service';
import { WarframesController } from './warframes.controller';
import { DatabaseModule } from '../../database/database.module';
import { WarframesRepository } from './warframes.repository';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [DatabaseModule, UtilsModule],
  providers: [WarframesService, WarframesRepository],
  controllers: [WarframesController],
})
export class WarframesModule {}
