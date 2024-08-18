import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('/signup')
  async createUser(@Body() body: any): Promise<any> {
    const payload = { email: body.email, password: body.password };

    try {
      const userServiceUrl = 'http://user-srv:3000/users/signup';
      const response = await firstValueFrom(
        this.httpService.post(userServiceUrl, payload),
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'User creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/get-user')
  async getUserData(): Promise<any> {
    const userServiceUrl = 'http://user-srv:3000/users/hello';
    const response = await firstValueFrom(this.httpService.get(userServiceUrl));

    return response.data;
  }

  @Get('/test')
  testRoute() {
    return 'Test route from auth service';
  }
}
