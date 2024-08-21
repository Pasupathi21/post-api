import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express'
import * as env from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'


async function bootstrap() {

  // load env
  env?.config()

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'debug', 'fatal', 'log', 'verbose', 'warn']
  });

  // cors
  app.enableCors({
    origin: "*"
  })

  // enable swagger docs
  const swaggerOpts: any = new DocumentBuilder().setTitle('Api Collection').setDescription('').setVersion('0.0.0')
  const apiDocument = SwaggerModule.createDocument(app, swaggerOpts)
  SwaggerModule.setup('docs', app, apiDocument)

  const PORT = process.env.PORT || 2200
  console.log("PORT >>>>>", PORT)
  await app.listen(PORT);
}
bootstrap();
