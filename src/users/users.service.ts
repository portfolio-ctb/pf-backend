import { Injectable } from '@nestjs/common';

interface User {
  ID: number;
  userName: string;
  password: string;
}
@Injectable()
export class UsersService {
  async findOne(userName: string): Promise<User | undefined> {
    return { ID: 1, userName, password: 'admin' };
  }
}
