import { HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { JwtService } from '@nestjs/jwt'
import { DatabaseService } from 'src/config/database/database.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwt: JwtService,
    private readonly DB: DatabaseService
  ){}
  // create(createAuthenticationDto: CreateAuthenticationDto) {
  //   return 'This action adds a new authentication';
  // }

  async signIn(payload: SigninDto) {
    try{
      return Promise.resolve()
    }catch(error){
      return Promise.reject(error)
    }
  }

  async signUp(payload: SignupDto){
    const Model = this.DB.getModels()
    try{
      // check duplicate user
      const findDuplicateUser = await Model.Users.findOne({ email: payload.email })
      if(findDuplicateUser){
        return Promise.resolve({
          message: 'duplicate user found',
          statusCode: HttpStatus.BAD_REQUEST
        })
      }

      // hash password
      const saltValue = await bcrypt.genSalt(6)
      payload.password = await bcrypt.hash(payload.password, saltValue)
      payload.username = `${payload.first_name} ${payload.last_name || ''}`.trim()
      const userCreated = await Model.Users.create(payload)
      return Promise.resolve(userCreated)
    }catch(error){
      return Promise.reject(error)
    }
  }
}
