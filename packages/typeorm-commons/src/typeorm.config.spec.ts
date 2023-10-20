import { describe, expect, it } from '@jest/globals';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { DataSourceOptions } from 'typeorm';
import { registerTypeORMConfigAs } from './typeorm.config.js';

describe('registerTypeORMConfigAs', () => {
  describe('type', () => {
    it('defaults to `postgres`', async () => {
      const TypeORMConfig = registerTypeORMConfigAs('test_db', { TEST_DB_SCHEMA: 'test_schema' });
      const moduleRef = await Test.createTestingModule({
        imports: [ConfigModule.forFeature(TypeORMConfig)],
      }).compile();

      const config = moduleRef.get<DataSourceOptions>(TypeORMConfig.KEY);

      expect(config).toMatchObject({
        type: 'postgres',
        schema: 'test_schema',
      });
    });
  });
});
