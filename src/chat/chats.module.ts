import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/entities/message.entity';
import { MessagesService } from 'src/messages/services/messages.service';
import { User } from 'src/users/entities/user.entity';
import { GroupChatGateway } from './gateways/group-chat.gateway';
import { ChatsController } from './controllers/chats.controller';
import { ChatsService } from './services/chats.service';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Chat])],
  providers: [
    ChatGateway,
    UsersService,
    MessagesService,
    GroupChatGateway,
    ChatsService,
  ],
  controllers: [ChatsController],
})
export class ChatsModule {}
