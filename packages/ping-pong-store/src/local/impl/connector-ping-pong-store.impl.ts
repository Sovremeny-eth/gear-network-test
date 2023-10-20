import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  ConnectorPingPongStoreService,
  PingPongStoreService,
} from '../../ping-pong-store.service.js';
import { ITestData, TestDataEntity } from '../store/index.js';

@Injectable()
export class ConnectorPingPongStore implements ConnectorPingPongStoreService {
  readonly #logger: Logger;
  readonly #manager: EntityManager;

  constructor(manager: EntityManager) {
    this.#logger = new Logger(ConnectorPingPongStore.name);

    this.#manager = manager;
  }

  async createData(request: ITestData): Promise<string> {
    const dataResult = await this.#manager
      .createQueryBuilder()
      .insert()
      .into(TestDataEntity)
      .values(request)
      .execute();

    this.#logger.log(`Success create data with id ${dataResult.identifiers[0].id as string}`);

    return dataResult.identifiers[0].id as string;
  }

  async getStatistics(): Promise<PingPongStoreService.Statistics> {
    const query = await this.#manager
      .getRepository(TestDataEntity)
      .createQueryBuilder('data')
      .select(`COALESCE(SUM(CASE WHEN "message" = 'Ping' THEN 1 ELSE 0 END), 0)`, 'totalPing')
      .addSelect(`COALESCE(SUM(CASE WHEN "message" = 'Pong' THEN 1 ELSE 0 END), 0)`, 'totalPong')
      .addSelect(`COALESCE(SUM(CASE WHEN "message" = '' THEN 1 ELSE 0 END), 0)`, 'totalErr')
      .getRawOne<PingPongStoreService.Statistics>();

    const { totalPing, totalPong, totalErr } = query!;

    this.#logger.log(`Success read statistics`);

    return { totalPing, totalPong, totalErr };
  }
}
