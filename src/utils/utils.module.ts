import { Module, Global } from '@nestjs/common'
import { GeneralService } from './generals/generals.service';
import { FileHandlingService } from './filehandling/filehandling.service';

@Global()
@Module({
    imports: [],
    providers: [
        GeneralService,
        FileHandlingService
    ],
    exports: [
        GeneralService,
        FileHandlingService
    ]
})
export class UtilsModule {}