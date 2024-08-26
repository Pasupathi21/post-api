import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, PostDto } from './dto/create-post.dto';
import { Response } from 'express';
import { ResponseService } from 'src/services/response/response.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly responseService: ResponseService
  ) {}

  @Post()
  async addPost(@Body() payload: PostDto, @Res() res: Response) {
    try{
      const resolveRes = await this.postService.addPost(payload)
      return this.responseService.success(res, resolveRes, HttpStatus.OK)
    }catch(error){
      throw new HttpException({ message: error.message, error: JSON.stringify(error) }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
