import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {} // Inject it here

  getUserServiceUrl(): string {
    const url = this.configService.get<string>('USER_SERVICE_URL');
    if (!url) {
      throw new Error('USER_SERVICE_URL is not defined in the env variables');
    }
    return url;
  }
}