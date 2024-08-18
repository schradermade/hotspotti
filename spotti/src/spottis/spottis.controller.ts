import { Controller, Get } from '@nestjs/common';

@Controller('spottis')
export class SpottisController {
  @Get('hello')
  sayHello() {
    return 'Hello from spotti Service!';
  }
}
