import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
