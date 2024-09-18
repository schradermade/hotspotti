import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from '@hotspotti/common';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), HttpModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AppConfigService],
})
export class AuthModule {}
