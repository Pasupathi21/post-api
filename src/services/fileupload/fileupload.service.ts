import { Injectable } from '@nestjs/common';

@Injectable()
export class FileuploadService {
    constructor() { }

    async uploadFiles(files: Array<Express.Multer.File>) {
        try {
            console.log('files', files)
            return Promise.resolve()
        } catch (error) {
            return Promise.reject()
        }
    }
}
