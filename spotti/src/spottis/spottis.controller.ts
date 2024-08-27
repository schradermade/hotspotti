import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { CreateSpottiDto } from './dtos/create-spotti.dto';
import { Spotti } from './spotti.entity';
import { SpottisService } from './spottis.service';

@Controller('spottis')
export class SpottisController {
  constructor(private readonly spottisService: SpottisService) {}

  @Get()
  async getAllSpottis(): Promise<Spotti[]> {
    return this.spottisService.getAll();
  }

  @Post()
  async createSpotti(
    @Body() createSpottiDto: CreateSpottiDto,
  ): Promise<Spotti> {
    return this.spottisService.createOne(createSpottiDto);
  }

  @Get('/:spottiId')
  async getSpotti(@Param('spottiId') spottiId: number) {
    return this.spottisService.getOne(spottiId);
  }

  @Get('/test')
  returnTest() {
    return 'Hi there from spotti';
  }
}
