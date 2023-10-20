import { Injectable } from '@nestjs/common';
import { ConnectorPingPongStoreService, PingPongStoreService } from '../ping-pong-store.service.js';
import { ITestData } from './store/index.js';

@Injectable()
export class LocalPingPongStore implements ConnectorPingPongStoreService {
  readonly #connectorStore: ConnectorPingPongStoreService;

  constructor(connectorStore: ConnectorPingPongStoreService) {
    this.#connectorStore = connectorStore;
  }

  async createData(request: ITestData): Promise<string> {
    return await this.#connectorStore.createData(request);
  }

  async getStatistics(): Promise<PingPongStoreService.Statistics> {
    return await this.#connectorStore.getStatistics();
  }
}
