import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway {

  @SubscribeMessage('join')
  handleJoin(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.join(room);
    return { event: 'joined', room };
  }

  // To emit updates from services: this.server.to(room).emit('update', data);
  // Inject Server and use in services
}