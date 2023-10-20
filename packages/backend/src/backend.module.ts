import { Module } from '@nestjs/common';
import { PingPongApiModule } from './ping-pong/index.js';
import { StatisticsApiModule } from './statistics/index.js';

@Module({
  imports: [PingPongApiModule, StatisticsApiModule],
})
export class BackendModule {}
