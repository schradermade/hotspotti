import { Body, Controller, Param, Post, Get, Query } from '@nestjs/common';
import { CreateSpottiDto } from './dtos/create-spotti.dto';
import { Spotti } from './spotti.entity';
import { SpottisService } from './spottis.service';

@Controller('spottis')
export class SpottisController {
  constructor(private readonly spottisService: SpottisService) {}

  @Post()
  async createSpotti(
    @Body() createSpottiDto: CreateSpottiDto,
  ): Promise<Spotti> {
    return this.spottisService.createOne(createSpottiDto);
  }

  @Get()
  async getPaginatedSpottis(
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ): Promise<Spotti[]> {
    const spottis = this.spottisService.getPaginatedSpottis(
      parseInt(limit, 10),
      parseInt(offset, 10),
    );
    console.log('SPOTTIS:', spottis);
    return spottis;
  }

  @Get('/:spottiId')
  async getSpotti(@Param('spottiId') spottiId: number) {
    return this.spottisService.getOne(spottiId);
  }
}
