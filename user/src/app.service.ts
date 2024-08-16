import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World from UserService!!';
  }
}

// nest g controller auth  
// nest g service auth  
// nest g module auth     