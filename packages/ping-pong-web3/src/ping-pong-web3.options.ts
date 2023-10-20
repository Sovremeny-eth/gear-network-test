import { ModuleMetadata, Provider } from '@nestjs/common';

/**
 * {@link PingPongWeb3Module PingPongWeb3} initialization options.
 */
export interface PingPongWeb3Options {
  /**
   * Connection web3 options.
   */
  readonly providerAddress?: string | undefined;
  readonly programId?: string | undefined;
  readonly mnemonic?: string | undefined;
}

/**
 * Options for asynchronous {@link PingPongWeb3Module PingPongWeb3} initialization.
 */
export type AsyncPingPongWeb3Options = Pick<ModuleMetadata, 'imports' | 'providers'> &
  Omit<Provider<PingPongWeb3Options>, 'provider'>;
