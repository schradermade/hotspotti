import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import {
  AppConfigService,
  AppConfigModule,
  Hub,
  Spotti,
  User,
  JwtStrategy,
  UserAuthorizationGuard,
  TokenService,
} from '@hotspotti/common';
import { PassportModule } from '@nestjs/passport';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProtectedUserController } from './protected-user.controller';

@Module({
  imports: [
    PassportModule,
    AppConfigModule,
    TypeOrmModule.forFeature([User, Spotti, Hub]),
    HttpModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.getJwtSecret(),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [UserController, ProtectedUserController],
  providers: [UserService, JwtStrategy, UserAuthorizationGuard, TokenService],
  exports: [UserService],
})
export class UserModule {}
