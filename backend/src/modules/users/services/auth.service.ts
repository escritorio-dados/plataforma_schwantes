import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppError } from '#shared/errors/AppError';

import { AuthDto } from '../dtos/auth.dto';
import { User } from '../entities/User';
import { authErrors } from '../errors/auth.errors';
import { HashProvider } from '../providers/hash.provider';
import { IJwtPayload } from '../providers/jwt.strategy';
import { UsersRepository } from '../repositories/users.repository';

export type IAuthType = { user: User; token: string };

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
    private jwtService: JwtService,
  ) {}

  private async getUserToken(user: User) {
    const payload: IJwtPayload = { email: user.email, sub: user.id };

    return this.jwtService.signAsync(payload);
  }

  async validadeUser({ email, password }: AuthDto): Promise<IAuthType> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(authErrors.emailInvalid);
    }

    const validPassword = await this.hashProvider.compareHash(password, user.password);

    if (!validPassword) {
      throw new AppError(authErrors.passwordInvalid);
    }

    const token = await this.getUserToken(user);

    delete user.password;

    return { token, user };
  }
}
