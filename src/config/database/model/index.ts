import { Model } from 'mongoose';
import {Test, TestSchema} from './schema/test'
import { TestTwo,  TestSchemaTwo } from './schema/test-two'

export const MODEL_SCHEMAS = [
    {
        name: Test.name,
        schema: TestSchema,
    },
    {
        name: TestTwo.name,
        schema: TestSchemaTwo,
    }
]

export interface ModelsType {
    Test: Model<Test>;
    TestTwo: Model<TestTwo>
}