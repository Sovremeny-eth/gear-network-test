import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MainBackendModule } from './main.backend.module.js';
import { MainPingPongWeb3Module } from './main.ping-pong-web3.module.js';
import { MainPingPongStoreModule } from './main.ping-pong.store.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MainBackendModule,
    MainPingPongWeb3Module,
    MainPingPongStoreModule,
  ],
})
export class MainAppModule {}
