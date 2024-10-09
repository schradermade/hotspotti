import { Module } from '@nestjs/common';
import { SpottisService } from './spottis.service';
import { SpottisController } from './spottis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hub, Spotti, SqsModule } from '@hotspotti/common';
import { SpottiMessagePollingService } from './spotti-message-polling.service';
import { SpottiMessageProcessorService } from './spotti-message-processor.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Spotti, Hub]),
    SqsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [SpottisController],
  exports: [SpottisService],
  providers: [
    SpottisService,
    SpottiMessagePollingService,
    SpottiMessageProcessorService,
  ],
})
export class SpottisModule {}
