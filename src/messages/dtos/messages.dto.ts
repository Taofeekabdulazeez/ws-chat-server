import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  senderId: string;

  @IsString()
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
