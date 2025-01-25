import { Response } from 'express';
import { ChatsService } from '../services/chats.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import { CreateChatDto } from '../dtos/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  public async createChat(
    @Body() body: CreateChatDto,
    @Res() response: Response,
  ) {
    const chat = await this.chatsService.createChat(body);

    return response
      .status(HttpStatus.OK)
      .json({ messsage: 'Chat created successfully', data: chat });
  }

  @Get(':id')
  public async getChat(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
  ) {
    const chat = await this.chatsService.findChatById(id);

    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: chat });
  }

  @Post(':id/messages')
  public async saveMessage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { receiverId: string; senderId: string; text: string },
    @Res() response: Response,
  ) {
    const message = await this.chatsService.saveMessage(id, body);

    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: message });
  }

  @Get(':id/messages')
  public async getMessages(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
  ) {
    const messages = await this.chatsService.findMessages(id);

    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: messages });
  }
}
