import { DynamicModule } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { LocalPingPongStoreModule } from '../local/local-ping-pong-store.module.js';
import { PingPongStoreModule } from '../ping-pong-store.module.js';
import { ServerPingPongStore } from './server-ping-pong-store.controller.js';

export const ServerPingPongStoreModule = {
  forRoot(dataSource: DataSource | DataSourceOptions | string): DynamicModule {
    return ServerPingPongStoreModule$register(dataSource, true);
  },

  forFeature(dataSource: DataSource | DataSourceOptions | string): DynamicModule {
    return ServerPingPongStoreModule$register(dataSource);
  },
};

function ServerPingPongStoreModule$register(
  dataSource: DataSource | DataSourceOptions | string,
  global?: boolean,
): DynamicModule {
  return {
    module: PingPongStoreModule,
    imports: [LocalPingPongStoreModule.forRoot(dataSource)],
    controllers: [ServerPingPongStore],
    global,
  };
}
