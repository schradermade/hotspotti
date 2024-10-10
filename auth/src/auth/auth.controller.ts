import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@hotspotti/common';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
// @UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
