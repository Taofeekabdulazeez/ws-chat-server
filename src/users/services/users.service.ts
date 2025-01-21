import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserSignUpDto } from 'src/auth/dtos/user-signup-dto';
import { MessagesService } from 'src/messages/services/messages.service';

@Injectable()
export class UsersService {
  onlineUsers: Array<string> = [];
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly messagesService: MessagesService,
  ) {}

  async createUser(data: UserSignUpDto) {
    const newUser = this.usersRepository.create(data);

    return this.usersRepository.save(newUser);
  }

  async findUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user)
      throw new NotFoundException(
        `User with email: ${email} doesn't have an account`,
      );

    return user;
  }

  async saveLastLogin(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    user.lastLogin = new Date(new Date().toISOString());

    return this.usersRepository.save(user);
  }

  async findAllUsers() {
    const allUsers = await this.usersRepository.find();

    return allUsers;
  }

  async deleteUserByEmail(email: string) {
    await this.usersRepository.delete({ email });
  }

  public async findAllUserChats(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['chats', 'chats.messages', 'chats.users'],
    });

    return user.chats;
  }
}
