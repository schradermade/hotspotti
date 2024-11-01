import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, SignInDto } from '@hotspotti/common';
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

  @Post('/signin')
  @ApiOperation({ summary: 'Sign user in' })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  @ApiResponse({ status: 500, description: 'User signin failed' })
  async signIn(@Body() body: SignInDto): Promise<any> {
    try {
      const response = await this.authService.signIn(body);
      return response;
    } catch (error) {
      console.error('Sign-in error:', error);
      throw new HttpException(
        'User sign-in failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/check-email')
  async checkEmailInUse(@Query('email') email: string): Promise<any> {
    const emailExists = await this.authService.checkEmailInUse(email);
    return { emailInUse: emailExists };
  }
}
