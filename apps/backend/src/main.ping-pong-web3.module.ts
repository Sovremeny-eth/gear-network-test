import { PingPongWeb3Module } from '@gear-test/ping-pong-web3';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PingPongWeb3Module.forRoot()],
})
export class MainPingPongWeb3Module {}
