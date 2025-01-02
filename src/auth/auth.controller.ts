import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const { id } = body;
    const user = await this.authService.loginUser(parseInt(id));

    return res.status(HttpStatus.OK).json({ message: 'Success', data: user });
  }

  @Get('users')
  async getAllUsers(@Res() res: Response) {
    const users = await this.usersService.getUsers();

    return res.status(HttpStatus.OK).json({ message: 'success', data: users });
  }
}
