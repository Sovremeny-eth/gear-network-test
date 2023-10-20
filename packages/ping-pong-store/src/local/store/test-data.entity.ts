import { TimestampColumn } from '@gear-test/typeorm-commons';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ITestData } from './types/index.js';

@Entity('data')
export class TestDataEntity implements ITestData {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  message: string;

  @TimestampColumn()
  timestamp: Date;
}
