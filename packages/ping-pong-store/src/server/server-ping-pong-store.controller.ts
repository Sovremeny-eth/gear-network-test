import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ITestData } from '../local/store/index.js';
import { PingPongStoreService } from '../ping-pong-store.service.js';

@Controller()
export class ServerPingPongStore implements PingPongStoreService {
  readonly #pingPongStore: PingPongStoreService;

  constructor(pingPongStore: PingPongStoreService) {
    this.#pingPongStore = pingPongStore;
  }

  @MessagePattern('ping-pong-store/create-data')
  async createData(request: ITestData): Promise<string> {
    return await this.#pingPongStore.createData(request);
  }

  @MessagePattern('ping-pong-store/get-statistics')
  async getStatistics(): Promise<PingPongStoreService.Statistics> {
    return await this.#pingPongStore.getStatistics();
  }
}
