import config from './config';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
})
export class AppModule {}
