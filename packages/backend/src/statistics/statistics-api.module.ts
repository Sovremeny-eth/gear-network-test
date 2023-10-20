import { PingPongStoreModule } from '@gear-test/ping-pong-store';
import { Module } from '@nestjs/common';
import { StatisticsControllerV1 } from './v1/statistics.controller.js';

@Module({
  imports: [PingPongStoreModule],
  controllers: [StatisticsControllerV1],
})
export class StatisticsApiModule {}
