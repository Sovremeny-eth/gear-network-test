import { PingPongStoreModule } from '@gear-test/ping-pong-store';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  PING_PONG_WEB3_CONFIG,
  PING_PONG_WEB3_OPTIONS_TOKEN,
} from './impl/ping-pong-web3.config.js';
import { PingPongWeb3 } from './impl/ping-pong-web3.impl.js';
import { AsyncPingPongWeb3Options, PingPongWeb3Options } from './ping-pong-web3.options.js';
import { PingPongWeb3Service } from './ping-pong-web3.service.js';

@Module({})
export class PingPongWeb3Module {
  static forRoot(options?: PingPongWeb3Options): DynamicModule {
    return PingPongWeb3Module$register(options, true);
  }

  static forFeature(options?: PingPongWeb3Options): DynamicModule {
    return PingPongWeb3Module$register(options);
  }

  static forRootAsync(options: AsyncPingPongWeb3Options): DynamicModule {
    return PingPongWeb3Module$registerAsync(options, true);
  }

  static forFeatureAsync(options: AsyncPingPongWeb3Options): DynamicModule {
    return PingPongWeb3Module$registerAsync(options);
  }
}

const PingPongWeb3Module$draft = {
  module: PingPongWeb3Module,
  imports: [ConfigModule.forFeature(PING_PONG_WEB3_CONFIG), PingPongStoreModule],
  providers: [
    PingPongWeb3,
    {
      provide: PingPongWeb3Service,
      useExisting: PingPongWeb3,
    },
  ],
  exports: [PingPongWeb3Service],
};

function PingPongWeb3Module$register(
  options?: PingPongWeb3Options,
  global?: boolean,
): DynamicModule {
  return {
    ...PingPongWeb3Module$draft,
    providers: [
      ...PingPongWeb3Module$draft.providers,
      { provide: PING_PONG_WEB3_OPTIONS_TOKEN, useValue: options ?? {} },
    ],
    global,
  };
}

function PingPongWeb3Module$registerAsync(
  options: AsyncPingPongWeb3Options,
  global?: boolean,
): DynamicModule {
  return {
    ...PingPongWeb3Module$draft,
    providers: [
      ...PingPongWeb3Module$draft.providers,
      {
        provide: PING_PONG_WEB3_OPTIONS_TOKEN,
        ...options,
      } as Provider<PingPongWeb3Options>,
    ],
    global,
  };
}
