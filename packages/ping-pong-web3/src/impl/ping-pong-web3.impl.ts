import {
  decodeAddress,
  GearApi,
  GearKeyring,
  GearTransaction,
  HexString,
  MessageQueued,
  ProgramMetadata,
} from '@gear-js/api';
import { parseUndefined } from '@gear-test/common';
import { PingPongStoreService } from '@gear-test/ping-pong-store';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types.js';
import { KeyringPair } from '@polkadot/keyring/types.js';
import { PingPongWeb3Options } from '../ping-pong-web3.options.js';
import { PingPongWeb3Service } from '../ping-pong-web3.service.js';
import { PING_PONG_WEB3_CONFIG, PING_PONG_WEB3_OPTIONS_TOKEN } from './ping-pong-web3.config.js';

@Injectable()
export class PingPongWeb3 extends PingPongWeb3Service {
  readonly #logger: Logger;

  readonly #config: PingPongWeb3Options;
  readonly #pingPongStoreService: PingPongStoreService;

  constructor(
    @Inject(PING_PONG_WEB3_OPTIONS_TOKEN) options: PingPongWeb3Options,
    @Inject(PING_PONG_WEB3_CONFIG.KEY) envConfig: ConfigType<typeof PING_PONG_WEB3_CONFIG>,
    @Inject(PingPongStoreService) pingPongStoreService: PingPongStoreService,
  ) {
    super();

    this.#logger = new Logger(PingPongWeb3.name);

    this.#config = !parseUndefined(options.providerAddress) ? options : envConfig;

    const isNotValidOptions = Object.values(this.#config).some((value) => {
      return typeof value === 'undefined' || value === '';
    });

    if (isNotValidOptions) {
      throw new TypeError('Missing environment variables');
    }

    this.#pingPongStoreService = pingPongStoreService;
  }

  get config() {
    return this.#config;
  }

  async ping(): Promise<false | string> {
    const { providerAddress, mnemonic } = this.#config as Required<PingPongWeb3Options>;
    const programId = this.#config.programId as `0x${string}`;
    const gearApi = await GearApi.create({ providerAddress });

    if ((await gearApi.chain()) !== 'Vara Network Testnet') {
      this.#logger.error(`Chain ${await gearApi.chain()} is not Vara Network Testnet`);
      return false;
    }

    const programExists = await gearApi.program.exists(programId);

    if (!programExists) {
      this.#logger.error(`Program with address ${programId} does not exist`);
      return false;
    }

    const userKeyring: KeyringPair = await GearKeyring.fromMnemonic(mnemonic, 'Test');

    const programMetadata = ProgramMetadata.from(
      `0x000200000001000000000101000000000000000000dc0c000000050200040418526573756c740804540100044501080108084f6b040000000000000c4572720400080000010000080000050400`,
    );

    const sourceId = decodeAddress(userKeyring.address);

    const gas = await gearApi.program.calculateGas.handle(
      sourceId,
      programId,
      'Ping',
      0,
      true,
      programMetadata,
    );

    try {
      const txSend = await gearApi.message.send(
        {
          destination: programId,
          payload: 'Ping',
          gasLimit: gas.min_limit,
          value: 0,
        },
        programMetadata,
      );

      const waitForReply = gearApi.message.listenToReplies(programId);

      const messageId = await this.#sendTransaction(txSend, userKeyring);

      if (messageId === '0x') {
        this.#logger.error(`Failed to detect message id for ${programId}`);
        return false;
      }

      const timestamp = new Date();

      await this.#pingPongStoreService.createData({ id: messageId, message: 'Ping', timestamp });

      const reply = await waitForReply(messageId);

      const { id, payload } = reply.message;

      await this.#pingPongStoreService.createData({
        id: id.toHex(),
        // for some reason, if response equal Err, the return is considered successful
        message: payload.toUtf8().slice(2) === 'Pong' ? 'Pong' : '',
        timestamp,
      });

      this.#logger.log(`Success transaction on ${programId}`);
      return messageId;
    } catch (err) {
      this.#logger.error(`${err as string}`);
      return false;
    }
  }

  async #sendTransaction(
    submitted: GearTransaction | SubmittableExtrinsic,
    account: KeyringPair,
  ): Promise<HexString> {
    let messageId: HexString = '0x';
    return new Promise((resolve, reject) => {
      submitted.signAndSend(account, ({ events, status }) => {
        if (status.isFinalized) {
          resolve(messageId);
        }

        events.forEach(({ event }) => {
          switch (event.method) {
            case 'MessageQueued':
              messageId = (event as MessageQueued).data.id.toHex();
              break;
            case 'ExtrinsicFailed':
              reject(event.data.toString());
              break;
          }
        });
      });
    });
  }
}
