import config from './config';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [ConfigModule.forRoot({ load: [config] })],
})
export class AppModule {}
