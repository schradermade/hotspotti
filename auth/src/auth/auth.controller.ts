import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  AppConfigService,
  CreateUserDto,
  GetUserRequestDto,
} from '@hotspotti/common';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@ApiTags('Auth')
// @UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  private readonly userServiceBaseUrl: string; // Define it as a class property

  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService, // Inject AppConfigService
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
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
    try {
      const userData = await this.authService.createUser(body);
      return userData;
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
  async getUserData(@Body() body: GetUserRequestDto): Promise<any> {
    const { id } = body;

    const userServiceUrl = `${this.userServiceBaseUrl}/users/${id}`;
    const response = await firstValueFrom(this.httpService.get(userServiceUrl));

    return response.data;
  }
}
