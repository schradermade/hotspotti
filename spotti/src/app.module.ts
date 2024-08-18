import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpottisModule } from './spottis/spottis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spotti } from './spottis/spotti.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Spotti],
      synchronize: true,
    }),
    SpottisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
