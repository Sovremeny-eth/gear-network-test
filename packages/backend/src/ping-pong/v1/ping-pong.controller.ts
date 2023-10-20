import { PingPongWeb3Service } from '@gear-test/ping-pong-web3';
import { BadRequestException, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ping-pong')
@Controller('api/v1/ping-pong')
export class PingPongControllerV1 {
  readonly #pingPongWeb3: PingPongWeb3Service;

  constructor(pingPongWeb3: PingPongWeb3Service) {
    this.#pingPongWeb3 = pingPongWeb3;
  }

  @ApiBadRequestResponse({
    description: 'Reported when transaction failed',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'Return message id',
    type: 'string',
  })
  @Post('/')
  async ping(): Promise<string> {
    const response = await this.#pingPongWeb3.ping();

    if (typeof response === 'boolean') {
      throw new BadRequestException('Transaction failed');
    }

    return response;
  }
}
