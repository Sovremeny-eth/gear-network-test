import {
  ClientOptions,
  CustomClientOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

function pingPongStoreMicroserviceOptions() {
  return {
    host: process.env.PING_PONG_STORE_HOST,
    port: parseInt(process.env.PING_PONG_STORE_PORT ?? '') || 3001,
  };
}

/**
 * Ping-pong options for microservice: client.
 */
export function loadPingPongStoreClientOptions(): ClientOptions | CustomClientOptions {
  return {
    transport: Transport.TCP,
    options: pingPongStoreMicroserviceOptions(),
  };
}

/**
 * Ping-pong options for microservice: server.
 */
export function loadPingPongStoreMicroserviceOptions(): MicroserviceOptions {
  return {
    transport: Transport.TCP,
    options: {
      ...pingPongStoreMicroserviceOptions(),
      retryAttempts: parseInt(process.env.PING_PONG_STORE_RETRY_ATTEMPTS ?? '') || 3,
      retryDelay: parseInt(process.env.PING_PONG_STORE_RETRY_DELAY ?? '') || 3000,
    },
  };
}
