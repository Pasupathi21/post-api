import { Module, Global } from '@nestjs/common'
import { GeneralService } from './generals/generals.service';

@Global()
@Module({
    imports: [],
    providers: [
        GeneralService
    ],
    exports: [
        GeneralService
    ]
})
export class UtilsModule {}