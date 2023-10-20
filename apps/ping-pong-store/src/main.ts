import { loadPingPongStoreMicroserviceOptions } from '@gear-test/ping-pong-store';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MainAppModule } from './main.app.module.js';

async function bootstrap(): Promise<void> {
  const application = await NestFactory.createMicroservice<MicroserviceOptions>(
    MainAppModule,
    loadPingPongStoreMicroserviceOptions(),
  );

  application.enableShutdownHooks();
  await application.listen();
}

bootstrap().catch((error) => {
  console.error('Startup failed', error);
  process.exit(1);
});
