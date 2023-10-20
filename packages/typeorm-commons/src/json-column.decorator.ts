import { TypeORMDefaults } from '@gear-test/typeorm-presets';
import { Column, ColumnOptions, ValueTransformer } from 'typeorm';

export function JsonColumn(options: ColumnOptions = {}): PropertyDecorator {
  return Column(jsonColumnOptions(options));
}

const JsonTransformer: ValueTransformer = {
  to(value?: any | null): string | null {
    return value ? JSON.stringify(value) : null;
  },
  from(value?: string | null): any | null {
    return value ? JSON.parse(value) : null;
  },
};

function jsonColumnOptions(options: ColumnOptions): ColumnOptions {
  const { type = TypeORMDefaults.types.json } = options;

  const result: ColumnOptions = { ...options, type };

  if (type !== 'jsonb') result.transformer = JsonTransformer;

  return result;
}
