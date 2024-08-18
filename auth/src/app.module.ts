import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/auth.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'auth.sqlite',
      entities: [Auth],
      synchronize: true,
    }),
    AuthModule,
    HttpModule,
  ],
  providers: [AppService],
})
export class AppModule {}
