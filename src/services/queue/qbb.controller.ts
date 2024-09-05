import { Controller, All, Req, Res, Next} from '@nestjs/common'
import { NextFunction, Request, Response, Express } from 'express';
import { QUEUE_CONST } from 'src/data/queue.const'
import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { Queue } from 'bullmq'

@Controller('queue-console')
export class BullBoardController{
    
    constructor(){}
    @All('*')
    getQueueDashboard(
        @Req() req: Request,
        @Res() res: Response,
        @Next() nxt: NextFunction
    ){
        const queueArray = []
        for(let qItem of QUEUE_CONST){
            queueArray.push(new Queue(qItem.name))
        }
        
        const serverAdapter =new ExpressAdapter()
        serverAdapter.setBasePath('/api/queue-console')
        createBullBoard({
            queues: [...queueArray.map(q => new BullAdapter(q))],
            serverAdapter: serverAdapter
        })
        const router = serverAdapter.getRouter() as Express;
        const entryPointPath = '/api/queue-console';
        req.url = req.url.replace(entryPointPath, '/');
        router(req, res, nxt)
    }
}