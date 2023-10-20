import { NestFactory } from '@nestjs/core';
import module from 'node:module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MainAppModule } from './main.app.module.js';

function backendConfig$detectVersion(): string {
  const cjsRequire = module.createRequire(import.meta.url);
  const { version } = cjsRequire('@gear-test/backend/package.json') as { version: string };

  return version;
}

async function bootstrap(): Promise<void> {
  const application = await NestFactory.create(MainAppModule);

  const openAPI = new DocumentBuilder()
    .setTitle('Gear test')
    .setDescription('Ping-pong')
    .setVersion(backendConfig$detectVersion())
    .build();

  SwaggerModule.setup('api', application, SwaggerModule.createDocument(application, openAPI));

  application.enableShutdownHooks();

  await application.listen(3000);

  console.log(`Application is running on: ${await application.getUrl()}`);
}

bootstrap().catch((error) => {
  console.error('Startup failed', error);
  process.exit(1);
});
