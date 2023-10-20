import { PingPongStoreService } from '@gear-test/ping-pong-store';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatisticsResponse } from './statistics.response.js';

@ApiTags('statistics')
@Controller('api/v1/statistics')
export class StatisticsControllerV1 {
  readonly #pingPongStore: PingPongStoreService;

  constructor(pingPongStore: PingPongStoreService) {
    this.#pingPongStore = pingPongStore;
  }

  @ApiOkResponse({
    description: 'Return events',
    type: StatisticsResponse,
  })
  @Get('/')
  async getStatistics(): Promise<StatisticsResponse> {
    return await this.#pingPongStore.getStatistics();
  }
}
