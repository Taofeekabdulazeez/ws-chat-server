import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from 'src/messages/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [ChatGateway, UsersService, MessagesService],
})
export class ChatModule {}
