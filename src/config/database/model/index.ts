import { Model } from 'mongoose';
import {Test, TestSchema} from './schema/test'
import { TestTwo,  TestSchemaTwo } from './schema/test-two'
import { Users, UsersSchema } from './schema/users';

export const MODEL_SCHEMAS = [
    {
        name: Test.name,
        schema: TestSchema,
    },
    {
        name: TestTwo.name,
        schema: TestSchemaTwo,
    },
    {
        name: Users.name,
        schema: UsersSchema
    }
]

export interface ModelsType {
    Test: Model<Test>;
    TestTwo: Model<TestTwo>;
    Users: Model<Users>
}