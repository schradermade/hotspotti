import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/auth.entity';
import { HttpModule } from '@nestjs/axios';
import { AppConfigService } from '@hotspotti/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally, no need to import it in each module
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'auth.sqlite',
      entities: [Auth],
      synchronize: true,
    }),
    AuthModule,
    HttpModule,
  ],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
