import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/entities/message.entity';
import { MessagesService } from 'src/messages/services/messages.service';
import { User } from 'src/users/entities/user.entity';
import { GroupChatGateway } from './group-chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  providers: [ChatGateway, UsersService, MessagesService, GroupChatGateway],
})
export class ChatModule {}
