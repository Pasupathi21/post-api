import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SigninDto, SignupDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { ResponseService } from 'src/services/response/response.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly authenticationService: AuthenticationService
  ) {}

  @Post('/signin')
  async signIn(@Body() signinPayload: SigninDto, @Res() res: Response) {
    try{
      const resolveData: any = await this.authenticationService.signIn(signinPayload);
      this.responseService.success(res, resolveData)
    }catch(error){
      this.responseService.handleException(error)
    }
  }

  @Post('/siginup')
  async signUp(@Body() signupPayload: SignupDto, @Res() res: Response) {
    try{
      const resolveData: any = await this.authenticationService.signUp(signupPayload)
      this.responseService.success(res, null, resolveData?.statusCode, resolveData?.message)
    }catch(error){
      this.responseService.handleException(error)
    }
  }

  
}
