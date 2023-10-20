/* eslint-disable @typescript-eslint/unbound-method */
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { INestMicroservice, Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientPingPongStoreModule } from './client/index.js';
import { PingPongStoreService } from './ping-pong-store.service.js';
import { ServerPingPongStoreModule } from './server/index.js';

describe('PingPongStore', () => {
  let microservice: INestMicroservice;
  let moduleRef$server: TestingModule;
  let moduleRef$client: TestingModule;

  let client: PingPongStoreService;

  beforeAll(async () => {
    moduleRef$client = await Test.createTestingModule({
      imports: [
        ClientPingPongStoreModule.forRoot({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 3001,
          },
        }),
      ],
    }).compile();

    client = moduleRef$client.get(PingPongStoreService);
  });

  beforeAll(async () => {
    moduleRef$server = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          name: 'test',
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
        }),
        ServerPingPongStoreModule.forRoot('test'),
      ],
    }).compile();

    microservice = moduleRef$server.createNestMicroservice({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });
    microservice.enableShutdownHooks();
    microservice.useLogger(new Logger());

    await microservice.listen();
  });

  afterAll(async () => {
    await moduleRef$client.close();
    await microservice.close();
  });

  describe('test connect to Database', () => {
    it('testing data', async () => {
      const responseFirst = await client.createData({
        id: '1',
        message: 'Ping',
        timestamp: new Date(),
      });
      const responseSecond = await client.createData({
        id: '2',
        message: '',
        timestamp: new Date(),
      });

      expect(responseFirst).toBe('1');
      expect(responseSecond).toBe('2');
    });

    it('testing statistics', async () => {
      const response = await client.getStatistics();

      expect(response).toEqual({ totalPing: 1, totalPong: 0, totalErr: 1 });
    });
  });
});
