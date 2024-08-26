import { Injectable, Logger } from '@nestjs/common';
import { FileUploadProcess } from '../queue/processors/upload.process';
import { PROCESS_NAME } from 'src/data/queue.const';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FileuploadService {
    logger = new Logger(FileuploadService.name)
    constructor(
        private readonly fileuploadProcessQ: FileUploadProcess,
        private readonly firebaseService: FirebaseService
    ) { }

    async uploadFilesWithJobs(files: Array<Express.Multer.File>) {
        try {
            console.log('files service', files)
            this.fileuploadProcessQ.addJobToQueue(PROCESS_NAME[0], {
                files,
                cb: ({ job, jobRes }) => {
                    this.logger.log('FROM JOB CALLBACK(JOB): ',job.data)
                    this.logger.log("FROM JOB CALLBACK(RES): ", jobRes)
                }
            })
            return Promise.resolve({})
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async uploadFiles(files: Array<Express.Multer.File>) {
        try {
            console.log('files', files)
            await this.firebaseService.upload_one_or_many(files)
            return Promise.resolve({})
        } catch (error) {
            return Promise.reject()
        }
    }
}
