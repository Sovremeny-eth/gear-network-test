import { DynamicModule } from '@nestjs/common';
import { getEntityManagerToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';
import { PingPongStoreModule } from '../../ping-pong-store.module.js';
import { ConnectorPingPongStoreService } from '../../ping-pong-store.service.js';
import { TestDataEntity } from '../store/index.js';
import { ConnectorPingPongStore } from './connector-ping-pong-store.impl.js';

export const ConnectorPingPongStoreModule = {
  forRoot(dataSource: DataSource | DataSourceOptions | string): DynamicModule {
    return ConnectorPingPongStoreModule$register(dataSource, true);
  },

  forFeature(dataSource: DataSource | DataSourceOptions | string): DynamicModule {
    return ConnectorPingPongStoreModule$register(dataSource);
  },
};

function ConnectorPingPongStoreModule$register(
  dataSource: DataSource | DataSourceOptions | string,
  global?: boolean,
) {
  return {
    module: PingPongStoreModule,
    imports: [TypeOrmModule.forFeature([TestDataEntity], dataSource)],
    providers: [
      {
        provide: ConnectorPingPongStoreService,
        useFactory: (entityManager: EntityManager) => new ConnectorPingPongStore(entityManager),
        inject: [getEntityManagerToken(dataSource)],
      },
    ],
    exports: [ConnectorPingPongStoreService],
    global,
  };
}
