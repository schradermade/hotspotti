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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@hotspotti/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create user profile' })
  @ApiResponse({ status: 200, description: 'Profile successfully created' })
  @ApiResponse({ status: 500, description: 'User creation failed' })
  async createUser(@Body() body: CreateUserDto): Promise<any> {
    const payload = { email: body.email, password: body.password };

    try {
      const userServiceUrl =
        'http://user-srv-internal.default.svc.cluster.local:3000/users/signup';
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

  @Get('/profile')
  async getUserData(@Body() body: any): Promise<any> {
    const { id } = body;
    const userServiceUrl = `http://user-srv-internal.default.svc.cluster.local:3000/users/${id}`;
    const response = await firstValueFrom(this.httpService.get(userServiceUrl));

    return response.data;
  }
}
