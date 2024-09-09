import { Module } from '@nestjs/common';
import { SpottisController } from './spottis.controller';
import { SpottisService } from './spottis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hub, Spotti } from '@hotspotti/common';

@Module({
  imports: [TypeOrmModule.forFeature([Spotti, Hub])],
  controllers: [SpottisController],
  exports: [SpottisService],
  providers: [SpottisService],
})
export class SpottisModule {}
