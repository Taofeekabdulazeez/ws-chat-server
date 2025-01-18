import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/services/messages.service';
import { UsersService } from 'src/users/services/users.service';

@WebSocketGateway({ namespace: 'chat', cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  @WebSocketServer() private readonly server: Server;
  private userSocketMap = {};

  constructor(
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  public async handleConnection(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.query.userId as string;
    console.log('New client connected ===> ', userId);

    if (userId) this.userSocketMap[userId] = client.id;
    const user = await this.usersService.findUserById(userId);
    this.usersService.onlineUsers.push(user.fullName);

    this.server.emit('get-online-users', Object.keys(this.userSocketMap));
  }

  @SubscribeMessage('message') // socket.on('message');
  public handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(message);
    client.emit('reply', 'Hello, I got you bro');
    this.server.emit('reply', 'Hello, I got you bro');
  }

  @SubscribeMessage('get-online-users')
  public async handleGetUsers(@ConnectedSocket() client: Socket) {
    const users = await this.usersService.findAllUsers();
    client.emit('online-users', users);
  }

  @SubscribeMessage('new-message')
  public async handleNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: any,
  ) {
    const userId = client.handshake.query.userId as string;
    const receiverSocketId = this.getSocketId(message.receiverId);
    const senderSocketId = this.getSocketId(message.senderId);
    console.log(receiverSocketId, senderSocketId);

    const newMessage = await this.messagesService.createMessage(message);

    // if (!senderSocketId) return;

    this.server
      .to([receiverSocketId, senderSocketId])
      .emit('chat-update', newMessage);
    console.log(message);
  }

  @SubscribeMessage('selected-user')
  public handleSelectedUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() selectedUser: any,
  ) {
    console.log(selectedUser);
  }

  @SubscribeMessage('user-typing')
  public handleUserTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() recepientId: string,
  ) {
    const userId = client.handshake.query.userId as string;
    const receiverSocketId = this.getSocketId(recepientId);
    this.server.to(receiverSocketId).emit('user-activity', userId);

    console.log(userId, ' is typing');
  }

  public async handleDisconnect(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.query.userId as string;
    delete this.userSocketMap[userId];
    await this.usersService.saveLastLogin(userId);

    this.server.emit('get-online-users', Object.keys(this.userSocketMap));

    console.log('Client disconnected ===> ', userId);
  }

  private getSocketId(clientId: string) {
    return this.userSocketMap[clientId];
  }
}
