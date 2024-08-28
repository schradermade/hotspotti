import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('hubs')
export class HubsController {
  @Post()
  createHub(@Body() body: any): string {
    console.log('BODY:', body.content);
    return 'hub here!';
  }

  @Get('/hello')
  getHub() {
    return 'this is the getHub endpoint';
  }
}
