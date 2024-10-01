import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HubsService } from './hubs.service';
import { CreateHubDto, Hub } from '@hotspotti/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Hub')
@Controller('hubs')
export class HubsController {
  constructor(private readonly hubsService: HubsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Hub' })
  @ApiResponse({
    status: 200,
    description: 'Hub successfully created',
    type: Hub,
  })
  @ApiResponse({ status: 500, description: 'Hub creation failed' })
  @ApiBody({ type: CreateHubDto, description: 'Hub creation data' })
  async createHub(@Body() body: CreateHubDto): Promise<Hub> {
    const hub = await this.hubsService.createOne(body);
    return hub;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Hub' })
  @ApiResponse({
    status: 200,
    description: 'Hub successfully retrieved',
    type: Hub,
  })
  @ApiResponse({ status: 500, description: 'Hub retrieval failed' })
  @ApiParam({
    name: 'id',
    description: 'ID of the Hub to retrieve',
    type: Number,
  })
  async getHub(@Param('id') id: number): Promise<Hub> {
    return this.hubsService.getOne(id);
  }
}
