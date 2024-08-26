import { Controller, HttpException, HttpStatus, Post, Res, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { Response } from 'express';
import { ResponseService } from '../response/response.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MAX_FILES_UPLOAD_COUNT, tempDirPath } from 'src/data/app.const';
import { UploadFileValidation } from 'src/common/pipes/filevalidation.pipe';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesUploadDto } from './dto/fileupload.dto';


@ApiTags('File Upload')
@Controller('upload')
export class FileuploadController {
  constructor(
    private readonly fileuploadService: FileuploadService,
    private readonly responseService: ResponseService
  ) {}

  @Post('files')
  @UseInterceptors(FilesInterceptor('files', MAX_FILES_UPLOAD_COUNT, { dest: tempDirPath()}))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'upload files',
    type: FilesUploadDto
  })
  @UsePipes(new UploadFileValidation())
  async uploadFilesWithJob(@UploadedFiles() files: Array<Express.Multer.File>, @Res() res: Response) {
    try {
      const resolveRes:any = await this.fileuploadService.uploadFilesWithJobs(files)
      return this.responseService.success(res, resolveRes, HttpStatus.OK, 'upload is processing')
    } catch (error) {
      throw new HttpException({ message: error.message, error: JSON.stringify(error) }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('files-v1')
  @UseInterceptors(FilesInterceptor('files', MAX_FILES_UPLOAD_COUNT, { dest: tempDirPath()}))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'upload files',
    type: FilesUploadDto
  })
  @UsePipes(new UploadFileValidation())
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Res() res: Response) {
    try {
      const resolveRes:any = await this.fileuploadService.uploadFiles(files)
      return this.responseService.success(res, resolveRes)
    } catch (error) {
      throw new HttpException({ message: error.message, error: JSON.stringify(error) }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
