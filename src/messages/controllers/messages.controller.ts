import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateMessageDto, GetChatMessagesDto } from '../dtos/messages.dto';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(@Body() body: CreateMessageDto, @Res() res: Response) {
    const data = body;
    const message = await this.messagesService.createMessage(data);
    console.log(body);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'success', data: message });
  }

  @Get(':senderId/chat/:receiverId')
  async getMessages(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
    @Res() res: Response,
  ) {
    const messages = await this.messagesService.findAllChatMessages(
      senderId,
      receiverId,
    );

    return res
      .status(HttpStatus.OK)
      .json({ message: 'success', data: messages });
  }
}
