import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { TypeORMDefaults as Defaults } from '../base/index.js';
import { TypeORMPreset } from '../type-orm.preset.js';

/**
 * This is a preset to use inside tests.
 *
 * Jest's [moduleNameMapper] option can be utilized to replace the `default` preset with this one.
 *
 * [moduleNameMapper]: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
 */
export const TypeORMDefaults: TypeORMPreset = {
  ...Defaults,
  types: {
    ...Defaults.types,
    timestamptz: 'datetime', // sqlite does not support `timestamptz`
    enum: 'varchar',
    json: 'text',
  },
  // sqlite does not support locking
  locks: {
    forNoKeyUpdate: {
      mode: 'dirty_read',
      setLock<TEntity extends ObjectLiteral>(
        qb: SelectQueryBuilder<TEntity>,
        _tables?: string[],
      ): void {
        qb.setLock(this.mode, undefined);
      },
    },
    forUpdate: {
      mode: 'dirty_read',
      setLock<TEntity extends ObjectLiteral>(
        qb: SelectQueryBuilder<TEntity>,
        _tables?: string[],
      ): void {
        qb.setLock(this.mode);
      },
    },
  },
};
