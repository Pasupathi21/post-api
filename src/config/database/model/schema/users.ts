import { Schema, Prop,  SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
    timestamps: {
       createdAt: 'created_at',
       updatedAt: 'updated_at' 
    },
    versionKey: false
})
export class Users extends Document {
    @Prop({ required: true })
    first_name: string

    @Prop()
    last_name: string

    @Prop()
    username: string

    @Prop({ required: true, unique: true })
    email:string

    @Prop()
    password: string

    @Prop({ default: true })
    is_active: boolean
}

export const UsersSchema = SchemaFactory.createForClass(Users)