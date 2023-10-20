import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MainPingPongStoreModule } from './main.ping-pong-store.module.js';
import { MainTypeOrmModule } from './main.typeorm.module.js';

@Module({
  imports: [ConfigModule.forRoot(), MainPingPongStoreModule, MainTypeOrmModule],
})
export class MainAppModule {}
