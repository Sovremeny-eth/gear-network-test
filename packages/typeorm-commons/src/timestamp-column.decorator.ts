import { TypeORMDefaults } from '@gear-test/typeorm-presets';
import {
  Column,
  ColumnOptions,
  PrimaryColumn,
  PrimaryColumnOptions,
  ValueTransformer,
} from 'typeorm';

export function TimestampColumn(options?: ColumnOptions): PropertyDecorator {
  return Column(timestampColumnOptions(options));
}

export function PrimaryTimestampColumn(options?: PrimaryColumnOptions): PropertyDecorator {
  return PrimaryColumn(timestampColumnOptions(options));
}

const TimestampTransformer: ValueTransformer = {
  to(value?: Date | null): string | null | undefined {
    return value ? new Date(value).toISOString() : null;
  },
  from(value?: string | null): Date | null | undefined {
    return value != null ? new Date(value) : null;
  },
};

function timestampColumnOptions(options?: PrimaryColumnOptions): PrimaryColumnOptions;
function timestampColumnOptions(options?: ColumnOptions): ColumnOptions;

function timestampColumnOptions(
  options: ColumnOptions | PrimaryColumnOptions = {},
): ColumnOptions | PrimaryColumnOptions {
  const { type = TypeORMDefaults.types.timestamptz, transformer = TimestampTransformer } = options;

  return {
    ...options,
    transformer,
    type,
  };
}
