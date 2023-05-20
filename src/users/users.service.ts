import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRegisterDto } from 'src/auth/dto/UserRegisterDto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new BadRequestException('Account does not exist!');
    return user;
  }

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({ data: userRegisterDto });
      return user;
    } catch (err) {
      throw new BadRequestException('Duplicate email!');
    }
  }
}
