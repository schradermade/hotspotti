import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HubsModule } from './hubs/hubs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Hub } from './hubs/hub.entity';
import { Spotti, User, Hub } from '@hotspotti/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '/app/db/hub-db.sqlite',
      entities: [Hub, Spotti, User],
      synchronize: true,
      logging: true,
    }),
    HubsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
