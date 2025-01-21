import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { MessagesService } from 'src/messages/services/messages.service';
import { Message } from 'src/messages/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, MessagesService],
  exports: [AuthService],
})
export class AuthModule {}
