import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class FilesUploadDto {

 @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }})
 files: any[]
}