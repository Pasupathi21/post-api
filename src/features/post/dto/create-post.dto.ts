import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class CreatePostDto {}

export class PostDto {
    
    @ApiProperty()
    @IsString()
    user_id: string

    
    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty()
    @IsString()
    post_link: string

    
    // meta_data: Record<string, unknown>
}
