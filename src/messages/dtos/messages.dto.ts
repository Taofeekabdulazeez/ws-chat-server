import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  senderId: string;

  @IsNumber()
  receiverId: string;

  @IsString()
  text: string;
}

export class GetChatMessagesDto {
  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;
}
