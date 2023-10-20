import { ITestData } from './local/store/index.js';

/**
 * Ping-pong Store processing service.
 *
 * Provided by {@link PingPongStoreModule}.
 */
export abstract class PingPongStoreService {
  abstract createData(request: ITestData): Promise<string>;

  abstract getStatistics(): Promise<PingPongStoreService.Statistics>;
}

export abstract class ConnectorPingPongStoreService extends PingPongStoreService {}

export namespace PingPongStoreService {
  export interface Statistics {
    readonly totalPing: number;
    readonly totalPong: number;
    readonly totalErr: number;
  }
}
