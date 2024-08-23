
import { Injectable, Logger } from '@nestjs/common'
import { InjectQueue, Process, Processor } from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { QUEUE_CONST, PROCESS_NAME } from 'src/data/queue.const'

@Injectable()
@Processor(QUEUE_CONST[0].name)
export class FileUploadProcess {

    private readonly logger = new Logger(FileUploadProcess.name)

    constructor(
        @InjectQueue(QUEUE_CONST[0].name) private fileuploadQueue: Queue
    ){}

    @Process(PROCESS_NAME[0])
    handleFileUploadQueue(job: Job){
        this.logger.log(`job ${job.name}: `, job.data)
    }

    addJobToQueue(name: string, data: Record<string, any>){
        this.fileuploadQueue.add(name, data)
    }

}