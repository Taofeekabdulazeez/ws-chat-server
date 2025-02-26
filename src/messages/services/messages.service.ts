import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  public async findMessagesByChatId(id: string) {
    const messages = await this.messagesRepository.find({
      where: { chatId: id },
    });

    return messages;
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

  public async togglelikeMessage(messageId: number) {
    const message = await this.findMessageById(messageId);
    message.isLiked = !message.isLiked;

    return await this.messagesRepository.save(message);
  }

  public async deleteMessageById(id: number) {
    await this.messagesRepository.delete(id);
  }

  public async saveMessagesAsRead(messagesId: string[]) {
    return await this.messagesRepository.update(
      { id: In(messagesId) },
      { isRead: true },
    );
  }
}
