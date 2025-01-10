import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserSignInDto } from './dtos/user-signin-dto';
import { UserSignUpDto } from './dtos/user-signup-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() body: UserSignUpDto, @Res() response: Response) {
    const user = await this.usersService.createUser(body);
    return response
      .status(HttpStatus.OK)
      .json({ message: 'Account successfully created!', data: user });
  }

  @Post('signin')
  async signin(@Body() body: UserSignInDto, @Res() res: Response) {
    const { email } = body;
    const user = await this.usersService.findUserByEmail(email);

    return res.status(HttpStatus.OK).json({ message: 'Success', data: user });
  }

  @Get('users')
  async getAllUsers(@Res() res: Response) {
    const users = await this.usersService.findAllUsers();
    console.log(users);

    return res.status(HttpStatus.OK).json({ message: 'success', data: users });
  }
}
