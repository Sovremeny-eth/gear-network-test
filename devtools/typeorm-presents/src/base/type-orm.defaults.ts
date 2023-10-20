import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { TypeORMPreset } from '../type-orm.preset.js';

export const TypeORMDefaults: TypeORMPreset = {
  types: {
    timestamptz: 'timestamptz',
    enum: 'enum',
    json: 'jsonb',
  },
  locks: {
    forNoKeyUpdate: {
      mode: 'for_no_key_update',
      setLock<TEntity extends ObjectLiteral>(
        qb: SelectQueryBuilder<TEntity>,
        tables?: string[],
      ): void {
        qb.setLock(this.mode, undefined, tables);
      },
    },
    forUpdate: {
      mode: 'pessimistic_write',
      setLock<TEntity extends ObjectLiteral>(
        qb: SelectQueryBuilder<TEntity>,
        tables?: string[],
      ): void {
        qb.setLock(this.mode, undefined, tables);
      },
    },
  },
};
