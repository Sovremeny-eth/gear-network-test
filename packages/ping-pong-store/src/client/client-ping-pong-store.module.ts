import { DynamicModule } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
  CustomClientOptions,
} from '@nestjs/microservices';
import { PingPongStoreModule } from '../ping-pong-store.module.js';
import { PingPongStoreService } from '../ping-pong-store.service.js';
import { ClientPingPongStore } from './client-ping-pong-store.impl.js';

export const ClientPingPongStoreModule = {
  forRoot(options: ClientOptions | CustomClientOptions): DynamicModule {
    return ClientPingPongStoreModule$register(options, true);
  },

  forFeature(options: ClientOptions | CustomClientOptions): DynamicModule {
    return ClientPingPongStoreModule$register(options);
  },
};

function ClientPingPongStoreModule$register(
  options: ClientOptions | CustomClientOptions,
  global?: boolean,
): DynamicModule {
  const CLIENT_PING_PONG_STORE_TOKEN = Symbol('ClientPingPongStore');

  return {
    module: PingPongStoreModule,
    providers: [
      {
        provide: CLIENT_PING_PONG_STORE_TOKEN,
        useFactory: () => {
          return ClientProxyFactory.create(options);
        },
      },
      {
        provide: PingPongStoreService,
        useFactory: (client: ClientProxy) => new ClientPingPongStore(client),
        inject: [CLIENT_PING_PONG_STORE_TOKEN],
      },
    ],
    exports: [PingPongStoreService],
    global,
  };
}
