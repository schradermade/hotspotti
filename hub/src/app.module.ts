import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HubsModule } from './hubs/hubs.module';

@Module({
  imports: [HubsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
