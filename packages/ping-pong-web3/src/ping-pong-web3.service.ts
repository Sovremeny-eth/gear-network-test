/**
 * PingPongWeb3 processing service.
 *
 * Provided by {@link PingPongWeb3Module}.
 */
export abstract class PingPongWeb3Service {
  /**
   * Get ping data.
   *
   * @returns Promise resolved to id hex string.
   */
  abstract ping(): Promise<false | string>;
}
