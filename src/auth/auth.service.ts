import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userName: string, pass: string): Promise<any> {
    const user = await this.userServices.findOne(userName);
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = { userName, sub: user.ID };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
