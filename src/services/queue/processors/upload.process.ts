
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectQueue, Process, Processor } from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { QUEUE_CONST, PROCESS_NAME } from 'src/data/queue.const'
import { FirebaseService } from 'src/services/firebase/firebase.service'

@Injectable()
@Processor(QUEUE_CONST[0].name)
export class FileUploadProcess {

    private readonly logger = new Logger(FileUploadProcess.name)

    constructor(
        @InjectQueue(QUEUE_CONST[0].name) private fileuploadQueue: Queue,
        private readonly firebaseService: FirebaseService
    ){}

    // ******** process section
    @Process(PROCESS_NAME[0])
    async handleFileUploadQueue(job: Job){
        try{
            console.log('handleFileUploadQueue is running', job.data.files)
            const callback = job?.data?.cb
            const jobRes = await this.firebaseService.upload_one_or_many(job?.data?.files)
            console.log("jobRes >>>>>>", jobRes)
            // execute callback
            if (callback) {
                console.log("callback block")
                callback(
                    {
                        job,
                        jobRes,
                    })
            }

        }catch(error){
            throw new HttpException({ message: error.message, error: JSON.stringify(error)}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // ********* add jobs
    addJobToQueue(name: string, data: Record<string, any>){
        this.fileuploadQueue.add(name, data)
    }

}