import { PingPongWeb3Module } from '@gear-test/ping-pong-web3';
import { Module } from '@nestjs/common';
import { PingPongControllerV1 } from './v1/ping-pong.controller.js';

@Module({
  imports: [PingPongWeb3Module],
  controllers: [PingPongControllerV1],
})
export class PingPongApiModule {}
