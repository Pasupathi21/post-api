import { OnModuleInit, Logger } from '@nestjs/common'
import { WebSocketGateway, MessageBody, WebSocketServer, SubscribeMessage} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway()
export class SocketGateway implements OnModuleInit {
    private readonly logger = new Logger()

    @WebSocketServer()
    private readonly server: Server

    onModuleInit() {
        this.server.on('connection', (socket) => {
            this.logger.log(`socket connected with id: ${socket.id}`)
        })
    }

    // Listen event from client
    @SubscribeMessage('TEST_LISTEN')
    handleListenEvent(@MessageBody() body: any){
        this.handleEmitEvent('REPLY_EVENT', body)
    }

    // emit the event to client
    handleEmitEvent(eventName: string, data: any) {
        this.server.emit(eventName, data)
    }

}