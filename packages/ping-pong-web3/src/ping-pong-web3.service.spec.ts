/* eslint-disable @typescript-eslint/unbound-method */
import { PingPongStoreModule, PingPongStoreService } from '@gear-test/ping-pong-store';
import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockedObject } from 'jest-mock';
import { PingPongWeb3Module } from './ping-pong-web3.module.js';
import { PingPongWeb3Service } from './ping-pong-web3.service.js';

describe('PingPongWeb3Service', () => {
  let moduleRef: TestingModule;
  let service: PingPongWeb3Service;
  let application: INestApplication;

  let mockPingPongStoreService: MockedObject<PingPongStoreService>;

  beforeAll(async () => {
    mockPingPongStoreService = {
      createData: jest.fn(),
    } as Partial<PingPongStoreService> as MockedObject<PingPongStoreService>;

    moduleRef = await Test.createTestingModule({
      imports: [
        PingPongWeb3Module.forRoot({
          providerAddress: 'wss://testnet.vara-network.io',
          programId: '0xe634f49f29e289e65837e83602e961949505af0247e7ff9985e206eb1e173549',
          mnemonic:
            'exchange device someone honey deer cinnamon dilemma fury victory pipe basket stick',
        }),
        PingPongStoreModule,
        {
          module: PingPongStoreModule,
          providers: [
            {
              provide: PingPongStoreService,
              useValue: mockPingPongStoreService,
            },
          ],
          global: true,
          exports: [PingPongStoreService],
        },
      ],
    }).compile();

    application = moduleRef.createNestApplication();
    application.enableShutdownHooks();

    service = application.get(PingPongWeb3Service);

    await application.listen(3001);
  });

  afterAll(async () => {
    await application.close();
  });

  describe('test ping to contract', () => {
    it('testing ping', async () => {
      const response = await service.ping();

      expect(typeof response).toBe('string');
    }, 30000);
  });
});
