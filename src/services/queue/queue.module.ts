import { Module, Global, Inject, OnModuleInit, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PROCESSOR_CALSSES } from './processors/index'
import { QUEUE_CONST } from 'src/data/queue.const';


@Global()
@Module({
    imports: [
        // BullModule.registerQueueAsync(
        //     ...QUEUE_CONST.map((queue: Record<string, any>) => (
        //         {
        //             name: queue.name,
        //             imports: [ConfigModule],
        //             useFactory: (configService: ConfigService) => ({
        //                 redis: {
        //                     host: configService.get('REDIS_HOST'),
        //                     port: configService.get('REDIS_PORT')
        //                 }
        //             }),
        //             inject: [ConfigService]
        //         }
        //     ))
        // ),
        BullModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                console.log("root bull module", configService.get('REDIS_PORT'))
                return {
                    redis: {
                        host: configService.get('REDIS_HOST'),
                        port: configService.get('REDIS_PORT')
                    }
                }
            },
            imports: [ConfigModule],
            inject: [ConfigService]
        }),
        BullModule.registerQueueAsync(
            ...QUEUE_CONST.map((q) => ({
                name: q.name
            }))),

        // BullBoardModule.forRoot({
        //     route: 'queues',
        //     adapter: ExpressAdapter,
        // }),

        // BullBoardModule.forFeature(
        //     ...QUEUE_CONST.map((q: any) => ({
        //         name: q.name,
        //         adapter: BullAdapter
        //     }))
        // )

    ],
    controllers: [
        // BullBoardController
    ],
    providers: [
        ...PROCESSOR_CALSSES
    ],
    exports: [...PROCESSOR_CALSSES]
})
export class QueueModule {
}