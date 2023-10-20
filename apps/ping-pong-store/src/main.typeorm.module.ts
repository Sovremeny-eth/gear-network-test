import { registerTypeORMConfigAs } from '@gear-test/typeorm-commons';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const PG_PING_PONG_STORE_NAME = 'ping_pong_store_db';

const PG_PING_PONG_STORE_TYPEORM_CONFIG = registerTypeORMConfigAs(PG_PING_PONG_STORE_NAME);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: PG_PING_PONG_STORE_NAME,
      imports: [
        ConfigModule.forRoot({ load: [PG_PING_PONG_STORE_TYPEORM_CONFIG], isGlobal: true }),
      ],
      useFactory: async (dbOptions: DataSourceOptions): Promise<TypeOrmModuleOptions> =>
        Promise.resolve({
          ...dbOptions,
          autoLoadEntities: true,
          logging: false,
        }),
      inject: [PG_PING_PONG_STORE_TYPEORM_CONFIG.KEY],
    }),
  ],
})
export class MainTypeOrmModule {}
