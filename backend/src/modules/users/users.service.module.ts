import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';

import { HashProvider } from './providers/hash.provider';
import { JwtStrategy } from './providers/jwt.strategy';
import { AuthService } from './services/auth.service';
import { CommonUserService } from './services/common.user.service';
import { CreateUserService } from './services/create.user.service';
import { DeleteUserService } from './services/delete.user.service';
import { FindAllUserService } from './services/findAll.user.service';
import { FindOneUserService } from './services/findOne.user.service';
import { UpdateUserService } from './services/update.user.service';
import { UsersRepositoryModule } from './users.repository.module';

config();

@Module({
  imports: [
    UsersRepositoryModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    CommonUserService,
    FindAllUserService,
    FindOneUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    HashProvider,
    AuthService,
    JwtStrategy,
  ],
  exports: [
    FindAllUserService,
    FindOneUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    HashProvider,
    AuthService,
    JwtStrategy,
  ],
})
export class UsersServiceModule {}
