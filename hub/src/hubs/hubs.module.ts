import { Module } from '@nestjs/common';
import { HubsController } from './hubs.controller';
import { HubsService } from './hubs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spotti, User, Hub } from '@hotspotti/common';

@Module({
  imports: [TypeOrmModule.forFeature([Hub, Spotti, User])],
  controllers: [HubsController],
  exports: [HubsService],
  providers: [HubsService],
})
export class HubsModule {}
