import { registerAs } from '@nestjs/config';
import { PingPongWeb3Options } from '../ping-pong-web3.options.js';

/**
 * @internal
 */
export const PING_PONG_WEB3_OPTIONS_TOKEN = Symbol('PingPongWeb3OptionsToken');

/**
 * @internal
 */
export const PING_PONG_WEB3_CONFIG = registerAs<PingPongWeb3Options>(
  'ping-pong-web3',
  (): PingPongWeb3Options => {
    const { PROVIDER_ADDRESS, PROGRAM_ID, MNEMONIC } = process.env;
    return {
      providerAddress: PROVIDER_ADDRESS,
      programId: PROGRAM_ID,
      mnemonic: MNEMONIC,
    };
  },
);
