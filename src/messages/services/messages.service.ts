import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dtos/messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async createMessage(data: CreateMessageDto) {
    const newMessage = this.messagesRepository.create(data);
    return this.messagesRepository.save(newMessage);
  }

  async findAllChatMessages(senderId: string, receiverId: string) {
    const messages = await this.messagesRepository.find({
      where: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
      order: { timestamp: 'ASC' },
    });
    return messages;
  }
}
