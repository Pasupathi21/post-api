import { Injectable } from '@nestjs/common';
import { CreateUsermanagementDto } from './dto/create-usermanagement.dto';
import { UpdateUsermanagementDto } from './dto/update-usermanagement.dto';
import { DatabaseService } from 'src/config/database/database.service';
 ''

@Injectable()
export class UsermanagementService {
  constructor(
    private readonly DB: DatabaseService
  ){}
  async create(createUsermanagementDto: CreateUsermanagementDto) {
    try{
      const Model = this.DB.getModels()
    const createData = await Model.Test.create({
      message: 'Test messgaes'
    })
    // return 'This action adds a new usermanagement';
    return Promise.resolve(createData)
    }catch(error){
      return Promise.reject(error)
    }
    
  }
}
