import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document, Types  } from 'mongoose'
// import reference model
import { Users } from './users'

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false
})
export class Posts extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
    user_id: Users

    @Prop({})
    title: string

    @Prop({})
    description: string

    @Prop({ required: true })
    post_link: string

    @Prop({ type: Object})
    meta_data: Record<string, any>
    
}

export const PostSchema = SchemaFactory.createForClass(Posts)

