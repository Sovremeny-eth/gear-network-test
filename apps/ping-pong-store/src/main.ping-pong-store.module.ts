import { ServerPingPongStoreModule } from '@gear-test/ping-pong-store';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PG_PING_PONG_STORE_NAME } from './main.typeorm.module.js';

@Module({
  imports: [ConfigModule.forRoot(), ServerPingPongStoreModule.forRoot(PG_PING_PONG_STORE_NAME)],
})
export class MainPingPongStoreModule {}
