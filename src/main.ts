import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express'
import * as env from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Logger } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { QUEUE_CONST } from 'src/data/queue.const'
import { Queue } from 'bullmq';


async function bootstrap() {

  // load env
  env?.config()

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'debug', 'fatal', 'log', 'verbose', 'warn']
  });
  const logger = new Logger()
  // cors
  app.enableCors({
    origin: "*"
  })

  // global prefix
  app.setGlobalPrefix('api')

  // template engine setup
  app.setViewEngine('pug')
  app.setBaseViewsDir(join(__dirname, 'views'))

  const tempDir = join(__dirname, 'temp')
  if(!existsSync(tempDir)) mkdirSync(tempDir, { recursive: true })
  // ******* temp dir for upload task
  const multerDir = join(__dirname, 'temp', 'multer')
  if(!existsSync(multerDir)) mkdirSync(multerDir, { recursive: true})

  // enable swagger docs
  const swaggerOpts: any = new DocumentBuilder().setTitle('Api Collection').setDescription('').setVersion('0.0.0')
  const apiDocument = SwaggerModule.createDocument(app, swaggerOpts)
  SwaggerModule.setup('docs', app, apiDocument)

  //========= bullboard setup 
  const serverAdapter = new ExpressAdapter();
  const bullBoardPath = '/queue-console'
  serverAdapter.setBasePath(bullBoardPath)
  const queueArray = QUEUE_CONST.map(item => new Queue(item.name))
  createBullBoard({
    queues: [
      ...queueArray.map((q: any) => new BullAdapter(q))
    ],
    serverAdapter
  })
  app.use(bullBoardPath, serverAdapter.getRouter())

  const PORT = process.env.PORT || 2200
  console.log("PORT >>>>>", PORT)
  logger.log(`
    +================================================+
        server running on http://localhost:${PORT}/api
        API Collection http://localhost:${PORT}/docs
    +================================================+
    `)
    
  await app.listen(PORT);
}
bootstrap();
