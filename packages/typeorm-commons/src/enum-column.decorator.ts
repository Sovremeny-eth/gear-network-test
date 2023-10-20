import { TypeORMDefaults } from '@gear-test/typeorm-presets';
import { Column, ColumnOptions } from 'typeorm';

export function EnumColumn(options: ColumnOptions = {}): PropertyDecorator {
  return Column(enumColumnOptions(options));
}

function enumColumnOptions(options: ColumnOptions): ColumnOptions {
  const { type = TypeORMDefaults.types.enum } = options;

  return {
    ...options,
    type,
  };
}
