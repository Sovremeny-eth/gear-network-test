import {
  ClientPingPongStoreModule,
  loadPingPongStoreClientOptions,
} from '@gear-test/ping-pong-store';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientPingPongStoreModule.forRoot(loadPingPongStoreClientOptions()),
  ],
})
export class MainPingPongStoreModule {}
