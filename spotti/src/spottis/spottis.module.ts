import { Module } from '@nestjs/common';
import { SpottisController } from './spottis.controller';
import { SpottisService } from './spottis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spotti } from './spotti.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spotti])],
  controllers: [SpottisController],
  exports: [SpottisService],
  providers: [SpottisService],
})
export class SpottisModule {}
