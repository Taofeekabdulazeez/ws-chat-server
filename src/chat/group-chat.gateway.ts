import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3000, { origin: '*' })
export class GroupChatGateWay
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  @WebSocketServer() private readonly server: Server;
  private usersSocketMap = {};

  handleConnection(@ConnectedSocket() client: Socket) {
    // const userId = this.usersSocketMap;
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {}
}
