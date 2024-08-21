import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path'

import { ConfigModule } from '@nestjs/config'

// service module
import { ResponseModule } from './services/response/response.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV}`)
    }),

    // service modules
    ResponseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
