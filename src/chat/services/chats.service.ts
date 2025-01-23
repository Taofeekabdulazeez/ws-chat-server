import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';
import { UsersService } from 'src/users/services/users.service';
import { CreateChatDto } from '../dtos/create-chat.dto';
import { CreateMessageDto } from 'src/messages/dtos/messages.dto';
import { MessagesService } from 'src/messages/services/messages.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private readonly chatsRepository: Repository<Chat>,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  public async createChat(data: CreateChatDto) {
    const [user1Id, user2Id] = data.users;
    const user1 = await this.usersService.findUserById(user1Id);
    const user2 = await this.usersService.findUserById(user2Id);

    const newChat = this.chatsRepository.create({ users: [user1, user2] });

    return await this.chatsRepository.save(newChat);
  }

  public async findChatById(id: string) {
    const chat = await this.chatsRepository.findOne({
      where: { id },
      relations: ['users', 'messages'],
    });

    return chat;
  }

  public async saveMessage(
    chatId: string,
    data: { receiverId: string; senderId: string; text: string },
  ) {
    const newMessage = await this.messagesService.createMessage({
      ...data,
      chatId,
    });

    return newMessage;
  }

  public async findMessages(chatId: string) {
    const messages = await this.messagesService.findMessagesByChatId(chatId);

    return messages;
  }
}
