import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {} // Inject it here

  getServiceBaseUrl(serviceEnvKey: string): string {
    const url = this.configService.get<string>(serviceEnvKey);
    if (!url) {
      throw new Error(`${serviceEnvKey} is not defined in the env variables`);
    }
    return url;
  }

}