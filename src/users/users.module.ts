import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MessagesService } from 'src/messages/services/messages.service';
import { Message } from 'src/messages/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [UsersService, MessagesService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
