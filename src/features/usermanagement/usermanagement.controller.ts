import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express'

import { UsermanagementService } from './usermanagement.service';
import { CreateUsermanagementDto } from './dto/create-usermanagement.dto';
import { UpdateUsermanagementDto } from './dto/update-usermanagement.dto';
import { ResponseService } from 'src/services/response/response.service';

@Controller('usermanagement')
export class UsermanagementController {
  constructor(
    private readonly usermanagementService: UsermanagementService,
    private readonly responseService: ResponseService
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() createUsermanagementDto: CreateUsermanagementDto) {
    try{
      const resData = await this.usermanagementService.create(createUsermanagementDto);
      return this.responseService.success(res, resData)

    }catch(error){
      throw new HttpException({ message: error.message, error: JSON.stringify(error)}, HttpStatus.INTERNAL_SERVER_ERROR)
      // return this.responseService.failed()
    }
  }

  
}
