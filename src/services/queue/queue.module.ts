import { Module, Global, Inject } from '@nestjs/common';
import { BullModule } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PROCESSOR_CALSSES } from './processors/index'
import { QUEUE_CONST } from 'src/data/queue.const';
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
        )
    ],
    providers: [
        ...PROCESSOR_CALSSES
    ],
    exports: [...PROCESSOR_CALSSES]
})
export class QueueModule { }
