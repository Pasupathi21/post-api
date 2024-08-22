import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document, version } from 'mongoose'

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    // versionKey: false
})
export class Test extends Document {

    @Prop({ required: true })
    message: string

    @Prop()
    description: string
}

export const TestSchema = SchemaFactory.createForClass(Test)