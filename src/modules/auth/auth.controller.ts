import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
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
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('signup')
  signUp(@Body() userRegisterDto: UserRegisterDto) {
    return this.usersService.create(userRegisterDto);
  }
}
