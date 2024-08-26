import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, PostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/config/database/database.service';

@Injectable()
export class PostService {
  constructor(
    private readonly DB: DatabaseService
  ){}

  async addPost(postPayload: PostDto){
    const Model = this.DB.getModels()
    try{
      (await Model.Posts.create(postPayload)).toObject()
      return Promise.resolve({
        statusCode: HttpStatus.CREATED,
        
      })
    }catch(error){
      return Promise.reject(error)
    }
  }
}
