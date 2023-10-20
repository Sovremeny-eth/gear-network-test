import { DynamicModule } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PingPongStoreModule } from '../ping-pong-store.module.js';
import { ConnectorPingPongStoreService, PingPongStoreService } from '../ping-pong-store.service.js';
import { ConnectorPingPongStoreModule } from './impl/connector-ping-pong-store.module.js';
import { LocalPingPongStore } from './local-ping-pong-store.service.js';

export const LocalPingPongStoreModule = {
  forRoot(dataSource: DataSource | DataSourceOptions | string): DynamicModule {
    return LocalPingPongStoreModule$register(dataSource, true);
  },

  forFeature(dataSource: DataSource | DataSourceOptions | string): DynamicModule {
    return LocalPingPongStoreModule$register(dataSource);
  },
};

function LocalPingPongStoreModule$register(
  dataSource: DataSource | DataSourceOptions | string,
  global?: boolean,
) {
  return {
    module: PingPongStoreModule,
    imports: [ConnectorPingPongStoreModule.forRoot(dataSource)],
    providers: [
      {
        provide: PingPongStoreService,
        useFactory: (connectorDisputeStoreService: ConnectorPingPongStoreService) =>
          new LocalPingPongStore(connectorDisputeStoreService),
        inject: [ConnectorPingPongStoreService],
      },
    ],
    exports: [PingPongStoreService],
    global,
  };
}
