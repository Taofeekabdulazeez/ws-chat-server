import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserSignUpDto } from 'src/auth/dtos/user-signup-dto';

export const users = [
  {
    id: 1,
    avatar:
      'https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350',
    messages: [],
    name: 'Jane Doe',
  },
  {
    id: 2,
    avatar:
      'https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350',
    messages: [],
    name: 'John Doe',
  },
  {
    id: 3,
    avatar:
      'https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350',
    messages: [],
    name: 'Elizabeth Smith',
  },
  {
    id: 4,
    avatar:
      'https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg?fmt=webp&h=350',
    messages: [],
    name: 'John Smith',
  },
  {
    id: 5,
    avatar:
      'https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4',
    messages: [],
    name: 'Jakob Hoeg',
  },
];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
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

  async getUsers() {
    return users;
  }

  async getUser(id: number) {
    return users.find((user) => user.id === id);
  }
}
