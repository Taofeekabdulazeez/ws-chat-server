import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;

  @IsString()
  text: string;
}

export class GetChatMessagesDto {
  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;
}
