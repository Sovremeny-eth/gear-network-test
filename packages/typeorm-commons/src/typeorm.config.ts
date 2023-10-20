import { parseBoolean } from '@gear-test/common';
import { ConfigFactory, ConfigFactoryKeyHost, registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions.js';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

export function parseTypeORMConfig(name: string, env = process.env): DataSourceOptions {
  const prefix = name.toUpperCase();
  const type = env[`${prefix}_TYPE`] || 'postgres';

  if (type === 'postgres') {
    return parsePostgresTypeORMConfig(name, env);
  }

  throw new TypeError(`Unsupported database: ${type}`);
}

function parsePostgresTypeORMConfig(
  name: string,
  env: typeof process['env'],
): PostgresConnectionOptions {
  const prefix = name.toUpperCase();

  const port = env[`${prefix}_PORT`];
  const ssl = env[`${prefix}_SSL`];
  const useUTC = env[`${prefix}_USE_UTX`];
  const connectTimeoutMs = env[`${prefix}_CONNECT_TIMEOUT_MS`];
  const logNotifications = env[`${prefix}_LOG_NOTIFICATIONS`];
  const installExtensions = env[`${prefix}_INSTALL_EXTENSIONS`];

  return {
    ...parseBaseTypeORMConfig(name, env),
    type: 'postgres',
    url: env[`${prefix}_URL`],
    host: env[`${prefix}_HOST`],
    port: port ? parseInt(port) : undefined,
    username: env[`${prefix}_USERNAME`],
    password: env[`${prefix}_PASSWORD`],
    database: env[`${prefix}_DATABASE`],
    ssl: parseBoolean(ssl),
    schema: env[`${prefix}_SCHEMA`],
    useUTC: parseBoolean(useUTC),
    connectTimeoutMS: connectTimeoutMs ? parseInt(connectTimeoutMs) : undefined,
    uuidExtension: env[`${prefix}_UUID_EXTENSION`] as PostgresConnectionOptions['uuidExtension'],
    logNotifications: parseBoolean(logNotifications),
    installExtensions: parseBoolean(installExtensions),
    applicationName: env[`${prefix}_APPLICATION_NAME`],
  };
}

function parseBaseTypeORMConfig(
  name: string,
  env: typeof process['env'],
): Omit<BaseDataSourceOptions, 'type'> {
  const prefix = name.toUpperCase();

  const maxQueryExecutionTime = env[`${prefix}_MAX_QUERY_EXECUTION_TIME`];
  const synchronize = env[`${prefix}_SYNCHRONIZE`];
  const migrationsRun = env[`${prefix}_MIGRATIONS_RUN`];
  const dropSchema = env[`${prefix}_DROP_SCHEMA`];

  return {
    name,
    migrationsTableName: env[`${prefix}_MIGRATIONS_TABLE_NAME`],
    migrationsTransactionMode: env[
      `${prefix}_MIGRATIONS_TRANSACTION_MODE`
    ] as DataSourceOptions['migrationsTransactionMode'],
    logger: env[`${prefix}_LOGGER`] as DataSourceOptions['logger'],
    maxQueryExecutionTime: maxQueryExecutionTime ? parseInt(maxQueryExecutionTime) : undefined,
    synchronize: parseBoolean(synchronize, true),
    migrationsRun: parseBoolean(migrationsRun),
    dropSchema: parseBoolean(dropSchema),
    entityPrefix: env[`${prefix}_ENTITY_PREFIX`],
  };
}

/**
 * Registers TypeORM configuration.
 *
 * Maps environment variables with name `${name.toUpperCase()}_xxx` to corresponding data source options.
 */
export function registerTypeORMConfigAs(
  name: string,
  env = process.env,
): ConfigFactory<DataSourceOptions> &
  ConfigFactoryKeyHost<ReturnType<ConfigFactory<DataSourceOptions>>> {
  return registerAs<DataSourceOptions>(name, () => parseTypeORMConfig(name, env));
}
