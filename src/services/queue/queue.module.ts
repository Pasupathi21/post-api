import { Module, Global, Inject, OnModuleInit } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PROCESSOR_CALSSES } from './processors/index'
import { QUEUE_CONST } from 'src/data/queue.const';

import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter'
// import { BullAdapter } from 'bull-board/bullAdapter'
import { Queue } from 'bull';
import { ExpressAdapter } from '@bull-board/express'
@Global()
@Module({
    imports: [
        BullModule.registerQueueAsync(
            ...QUEUE_CONST.map((queue: Record<string, any>) => (
                {
                    name: queue.name,
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) => ({
                        redis: {
                            host: configService.get('REDIS_HOST'),
                            port: configService.get('REDIS_PORT')
                        }
                    }),
                    inject: [ConfigService]
                }
            ))
        ),

        BullBoardModule.forRoot({
            route: 'queues',
            adapter: ExpressAdapter
        }),

        BullBoardModule.forFeature(
            ...QUEUE_CONST.map((q: any) => ({
                name: q.name,
                adapter: BullAdapter
            }))
        )

    ],
    providers: [
        ...PROCESSOR_CALSSES
    ],
    exports: [...PROCESSOR_CALSSES]
})
export class QueueModule  { 

}
