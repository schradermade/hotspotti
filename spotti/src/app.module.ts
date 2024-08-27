import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpottisModule } from './spottis/spottis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spotti } from './spottis/spotti.entity';
import { SpottisController } from './spottis/spottis.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '/app/db/spotti-db.sqlite',
      entities: [Spotti],
      synchronize: true,
    }),
    SpottisModule,
  ],
  controllers: [AppController, SpottisController],
  providers: [AppService],
})
export class AppModule {}
