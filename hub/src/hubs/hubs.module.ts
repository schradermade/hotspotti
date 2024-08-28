import { Module } from '@nestjs/common';
import { HubsController } from './hubs.controller';
import { HubsService } from './hubs.service';

@Module({
  controllers: [HubsController],
  exports: [HubsService],
  providers: [HubsService],
})
export class HubsModule {}
