import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/services/users.service';

@WebSocketGateway({ namespace: 'group-chat', cors: { origin: '*' } })
export class GroupChatGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  constructor(private readonly usersService: UsersService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(client.id + ' joined');
    console.log('Online users ===> ', this.usersService.onlineUsers);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(client.id + ' left');
  }
}
