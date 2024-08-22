import { Module, Global } from '@nestjs/common'
import {ResponseService } from './response.service'

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [ResponseService],
    exports: [
        ResponseService
    ]
})
export class ResponseModule {}