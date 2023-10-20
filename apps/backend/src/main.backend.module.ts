import { BackendModule } from '@gear-test/backend';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), BackendModule],
})
export class MainBackendModule {}
