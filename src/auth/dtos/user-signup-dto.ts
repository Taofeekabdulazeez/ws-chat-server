import { IsEmail, IsString } from 'class-validator';

export class UserSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  password: string;
}
