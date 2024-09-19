import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AppConfigService, Hub, Spotti, User } from '@hotspotti/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Spotti, Hub]),
    HttpModule,
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService, AppConfigService],
  exports: [UserService],
})
export class UserModule {}
