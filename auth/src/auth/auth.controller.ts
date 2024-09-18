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
import { AppConfigService, CreateUserDto } from '@hotspotti/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly userServiceBaseUrl: string; // Define it as a class property

  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService, // Inject AppConfigService
  ) {
    // Initialize userServiceBaseUrl in the constructor
    this.userServiceBaseUrl = this.appConfigService.getServiceBaseUrl(
      'USER_SERVICE_BASE_URL',
    );
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Create user profile' })
  @ApiResponse({ status: 200, description: 'Profile successfully created' })
  @ApiResponse({ status: 500, description: 'User creation failed' })
  async createUser(@Body() body: CreateUserDto): Promise<any> {
    const payload = { email: body.email, password: body.password };
    const userServiceUrl = `${this.userServiceBaseUrl}/users/signup`;

    try {
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
  @ApiOperation({ summary: 'Retrieve user profile' })
  @ApiResponse({ status: 200, description: 'Profile successfully retrieved' })
  @ApiResponse({ status: 500, description: 'Profile retrieval failed' })
  async getUserData(@Body() body: any): Promise<any> {
    const { id } = body;
    const userServiceUrl = `${this.userServiceBaseUrl}/users/${id}`;
    const response = await firstValueFrom(this.httpService.get(userServiceUrl));

    return response.data;
  }
}
