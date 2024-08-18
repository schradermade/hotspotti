import { Module } from '@nestjs/common';
import { SpottisController } from './spottis.controller';
import { SpottisService } from './spottis.service';

@Module({
  controllers: [SpottisController],
  providers: [SpottisService],
})
export class SpottisModule {}
