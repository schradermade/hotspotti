import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SpottiMessageProcessorService } from './spotti-message-processor.service';

@Injectable()
export class SpottiMessagePollingService {
  constructor(
    private readonly spottiMessageProcessorService: SpottiMessageProcessorService,
  ) {}

  @Cron('*/10 * * * * *')
  async pollQueue() {
    await this.spottiMessageProcessorService.processMessages();
  }
}
