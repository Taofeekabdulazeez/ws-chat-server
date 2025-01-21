import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getAllUsers(@Res() response: Response) {
    const users = await this.usersService.findAllUsers();

    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: users });
  }

  @Delete('/:email')
  public async deleteUser(
    @Param('email') email: string,
    @Res() response: Response,
  ) {
    await this.usersService.deleteUserByEmail(email);

    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: null });
  }
}
