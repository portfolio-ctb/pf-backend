import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userServices.findOne(loginDto.email);
    if (user.password !== loginDto.password) {
      throw new BadRequestException('Incorrect password!');
    }
    const payload = { email: loginDto.email, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userRegisterDto: UserRegisterDto) {
    const user = await this.userServices.create(userRegisterDto);
    return user;
  }
}
