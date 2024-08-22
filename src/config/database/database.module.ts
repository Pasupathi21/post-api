import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

// mongoose schema
import { MODEL_SCHEMAS } from './model/index'
import { DatabaseService } from './database.service';

@Global()   
@Module({
    imports: [
        MongooseModule.forFeature(MODEL_SCHEMAS.map(m => ({ name: m?.name, schema: m?.schema})))
    ],
    controllers: [],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule {}
