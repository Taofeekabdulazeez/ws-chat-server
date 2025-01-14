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

  public async createMessage(data: CreateMessageDto) {
    const newMessage = this.messagesRepository.create(data);
    return this.messagesRepository.save(newMessage);
  }

  public async findMessageById(id: number) {
    const message = await this.messagesRepository.findOne({ where: { id } });
    return message;
  }

  public async findAllChatMessages(senderId: string, receiverId: string) {
    const messages = await this.messagesRepository.find({
      where: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
      order: { timestamp: 'ASC' },
    });
    return messages;
  }

  public async likeMessage(messageId: number) {
    const message = await this.findMessageById(messageId);
    message.isLiked = true;

    return await this.messagesRepository.save(message);
  }

  public async deleteMessageById(id: number) {
    await this.messagesRepository.delete(id);
  }
}
