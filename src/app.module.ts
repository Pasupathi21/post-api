// core module
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core';
import { join } from 'path'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { QUEUE_CONST } from './data/queue.const';

// app module
import { AppController } from './app.controller';
import { AppService } from './app.service';

// common module
import { GlobalExceptionFilter } from './common/filters/globalexception.filter';

// config
import { DatabaseModule } from './config/database/database.module';


// service module
import { ResponseModule } from './services/response/response.module';
import { ResponseService } from './services/response/response.service'
import { FileuploadModule } from './services/fileupload/fileupload.module';
import { CronModule } from './services/cron/cron.module';
import { SocketModule } from './services/socket/socket.module';
import { QueueModule } from './services/queue/queue.module';

// features
import { AuthenticationModule } from './features/authentication/authentication.module';
import { UsermanagementModule } from './features/usermanagement/usermanagement.module';
import { FirebaseModule } from './services/firebase/firebase.module';
import { PostModule } from './features/post/post.module';
import { UtilsModule } from './utils/utils.module';



@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV}`)
    }),

    // jwt
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: configService.get<string>("TOKEN_EXPIRE") }
      }),
    }),

    // config
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL')
      })
    }),
    DatabaseModule,

    // features
    AuthenticationModule,
    UsermanagementModule,

    // service modules
    ResponseModule,
    FileuploadModule,
    CronModule,
    SocketModule,
    QueueModule,
    FirebaseModule,
    PostModule,

    // utils
    UtilsModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    ResponseService,

    // adding global exception filter
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
  ],
  exports: [
    // ResponseService
  ]
})
export class AppModule {}
