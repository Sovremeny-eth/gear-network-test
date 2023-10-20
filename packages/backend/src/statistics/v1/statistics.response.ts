import { PingPongStoreService } from '@gear-test/ping-pong-store';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class StatisticsResponse implements PingPongStoreService.Statistics {
  @IsInt()
  @ApiProperty({
    description: 'Total ping transaction',
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  totalPing: number;

  @IsInt()
  @ApiProperty({
    description: 'Total pong transaction',
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  totalPong: number;

  @IsInt()
  @ApiProperty({
    description: 'Total err transaction',
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  totalErr: number;
}
