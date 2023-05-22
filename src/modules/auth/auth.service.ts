import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<any> {
    const user = await this.userServices.findOne(userLoginDto.email);
    if (user.password !== userLoginDto.password) {
      throw new BadRequestException('Incorrect password!');
    }
    const payload = { email: userLoginDto.email, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userRegisterDto: UserRegisterDto) {
    const user = await this.userServices.create(userRegisterDto);
    return user;
  }
}
