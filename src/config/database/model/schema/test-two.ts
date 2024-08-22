import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
} })
export class TestTwo extends Document {

    @Prop()
    messageTwo: string
}

export const TestSchemaTwo = SchemaFactory.createForClass(TestTwo)