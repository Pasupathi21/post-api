
import { Injectable} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ModelsType } from './model/index'

// all models
import { Test } from './model/schema/test'
import { TestTwo }from './model/schema/test-two'
import { Users } from './model/schema/users'

@Injectable()
export class DatabaseService {

    private models: ModelsType;
    constructor(
        // added all model schemas
        @InjectModel(Test.name) Test: Model<Test>,
        @InjectModel(TestTwo.name) TestTwo: Model<TestTwo>,
        @InjectModel(Users.name) Users: Model<Users>
    ){
        this.models = {
            Test,
            TestTwo,
            Users
        }
    }

    getModels(modelName?: string): ModelsType {
        // return single model
        if(modelName) return this.models[modelName]

        // return all model
        return this.models
    }
}