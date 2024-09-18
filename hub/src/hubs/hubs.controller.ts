import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HubsService } from './hubs.service';
import { CreateHubDto, Hub } from '@hotspotti/common';

@Controller('hubs')
export class HubsController {
  constructor(private readonly hubsService: HubsService) {}

  @Post()
  async createHub(@Body() body: CreateHubDto): Promise<Hub> {
    const hub = await this.hubsService.createOne(body);
    return hub;
  }

  @Get('/:id')
  async getHub(@Param('id') id: number) {
    console.log('hi there!');
    return this.hubsService.getOne(id);
  }
}
