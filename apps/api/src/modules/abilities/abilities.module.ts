import { Module } from '@nestjs/common';
import { AbilitiesController } from './abilities.controller';
import { AbilitiesService } from './abilities.service';
import { AbilitiesRepository } from './abilities.repository';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [AbilitiesController],
  providers: [AbilitiesService, AbilitiesRepository],
})
export class AbilitiesModule {}
