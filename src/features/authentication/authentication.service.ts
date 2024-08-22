import { HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { JwtService } from '@nestjs/jwt'
import { DatabaseService } from 'src/config/database/database.service';
import * as bcrypt from 'bcrypt'
import { omit } from 'lodash'

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
    const Model = this.DB.getModels()
    try{
      const findUser = await (await Model.Users.findOne({ email: payload.email })).toObject()
      if(!findUser){
        return Promise.resolve({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'invalid email'
        })
      }

      // if user exists
      const isValidPassword = await bcrypt.compare(payload.password, findUser.password)
      if(!isValidPassword) return Promise.resolve({ statusCode: HttpStatus.UNAUTHORIZED, message: 'invalid email'})
       
      // gen jwt token
      const token = this.jwt.sign({ email: findUser.email}, {
        secret: process.env.JWT_SECRET
      })
      return Promise.resolve({
        user: omit(findUser, ['password', 'created_at', 'updated_at', 'is_active']),
        token
      })
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
