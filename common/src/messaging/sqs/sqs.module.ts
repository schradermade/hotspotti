import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';

@Module({
  providers: [SqsService],
  exports: [SqsService],  // Exporting to make it available to other services
})
export class SqsModule {}
