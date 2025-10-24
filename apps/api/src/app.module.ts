import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WarframesModule } from './modules/warframes/warframes.module';
import { DatabaseModule } from './database/database.module';
import { AbilitiesModule } from './modules/abilities/abilities.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../.env',
    }),
    WarframesModule,
    AbilitiesModule,
    UtilsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
