import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

@Schema()
export class Test {

    @Prop()
    message: string
}

export const TestSchema = SchemaFactory.createForClass(Test)