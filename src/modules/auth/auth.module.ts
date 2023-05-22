import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import {
  JWT_EXPIRE_TIME_IN_SECOND,
  JWT_SECRET_KEY,
  MILISECONDS_PER_SECOND,
} from 'src/constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: JWT_EXPIRE_TIME_IN_SECOND * MILISECONDS_PER_SECOND,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
