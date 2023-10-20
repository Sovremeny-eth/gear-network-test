import { OnModuleDestroy } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ITestData } from '../local/store/index.js';
import { PingPongStoreService } from '../ping-pong-store.service.js';

export class ClientPingPongStore implements PingPongStoreService, OnModuleDestroy {
  readonly #client: ClientProxy;

  constructor(client: ClientProxy) {
    this.#client = client;
  }

  async createData(request: ITestData): Promise<string> {
    return firstValueFrom(this.#client.send('ping-pong-store/create-data', request));
  }

  async getStatistics(): Promise<PingPongStoreService.Statistics> {
    return firstValueFrom(this.#client.send('ping-pong-store/get-statistics', {}));
  }

  async onModuleDestroy() {
    await this.#client.close();
  }
}
