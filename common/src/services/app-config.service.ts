import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  getServiceBaseUrl(serviceEnvKey: string): string {
    const serviceBaseUrl = this.configService.get<string>(serviceEnvKey);
    
    if (!serviceBaseUrl) {
      throw new Error(`Service base URL for ${serviceEnvKey} is not defined in environment variables`);
    }
    
    return serviceBaseUrl;
  }

  getJwtSecret(): string {
    const jwtSecret = this.configService.get<string>('JWT_SIGN_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    return jwtSecret;
  }
}

