import { CreateUserDto } from '@hotspotti/common';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    @Inject('USER_SERVICE_BASE_URL')
    private readonly userServiceBaseUrl: string,
  ) {}

  async createUser(body: CreateUserDto): Promise<any> {
    const payload = {
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    };
    const userServiceUrl = `${this.userServiceBaseUrl}/users/signup`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(userServiceUrl, payload),
      );

      const jwtPayload = { id: response.data.id, email: response.data.email };
      const userJwt = this.jwtService.sign(jwtPayload);

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

  async generatetoken(user: any) {
    const payload = { userId: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
