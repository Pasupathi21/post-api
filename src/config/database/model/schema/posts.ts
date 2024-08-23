import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false
})
export class Posts extends Document {
    @Prop({ type: })
    user_id

    @Prop()
    
}

export const PostSchema = SchemaFactory.createForClass(Posts)

