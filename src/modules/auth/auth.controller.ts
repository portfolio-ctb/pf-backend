import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UsersService } from 'src/modules/users/users.service';
import { Public } from './auth.public';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Public()
  @Post('signup')
  signUp(@Body() userRegisterDto: UserRegisterDto) {
    return this.usersService.create(userRegisterDto);
  }
}
