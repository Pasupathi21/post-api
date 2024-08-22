import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'

@Schema()
export class TestTwo {

    @Prop()
    messageTwo: string
}

export const TestSchemaTwo = SchemaFactory.createForClass(TestTwo)