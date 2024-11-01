import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  AppConfigService,
  CreateUserDto,
  SignInDto,
  TokenService,
} from '@hotspotti/common';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  private readonly userServiceBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
    private readonly tokenService: TokenService,
  ) {
    this.userServiceBaseUrl = this.appConfigService.getServiceBaseUrl(
      'USER_SERVICE_BASE_URL',
    );
  }

  async createUser(body: CreateUserDto): Promise<any> {
    const payload = {
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.userServiceBaseUrl}/users/signup`,
          payload,
        ),
      );

      const userJwt = await this.tokenService.generateToken(response.data);

      return {
        accessToken: userJwt,
        user: response.data,
      };
    } catch (error) {
      if (error.response) {
        // If the error is coming from the user service
        throw new HttpException(
          error.response.data.message || 'User creation failed',
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        // Network or other internal errors
        throw new HttpException(
          'User creation failed due to internal error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.userServiceBaseUrl}/users/signin`,
          signInDto,
        ),
      );
      return response.data;
    } catch (error) {
      // Check if the error is an AxiosError and typecast it
      if (error instanceof AxiosError) {
        console.error('Axios error:', error);

        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
          throw new HttpException(
            'Invalid credentials',
            HttpStatus.UNAUTHORIZED,
          );
        }

        // Handle other errors (e.g., 500 Internal Server Error)
        throw new HttpException(
          error.response?.data?.message || 'Failed to sign in',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // If it's not an AxiosError, throw a generic error
      console.error('Sign-in error:', error);
      throw new HttpException(
        'Failed to sign in',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkEmailInUse(email: string): Promise<boolean> {
    console.log('AUTH_CHECK_EMAIL:');
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.userServiceBaseUrl}/users/email/${email}`),
      );
      console.log('CHECK_RESPONSE:', response.data);
      return !!response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      }
      throw error;
    }
  }
}
