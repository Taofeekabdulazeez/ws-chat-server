import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async createMessage(data: any) {
    const newMessage = this.messagesRepository.create(data);
    return this.messagesRepository.save(newMessage);
  }

  async findAllChatMessages(senderId: number, receiverId: number) {
    const messages = await this.messagesRepository.find({
      where: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
      order: { timestamp: 'ASC' },
    });
    return messages;
  }

  async getAllUserMessages(userId: number) {
    const messages = await this.messagesRepository.find({ where: {} });
  }
}
