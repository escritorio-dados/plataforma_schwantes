import { Injectable } from '@nestjs/common';

import { AppError } from '#shared/errors/AppError';

import { userErrors } from '../errors/user.errors';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class CommonUserService {
  constructor(private usersRepository: UsersRepository) {}

  async validadeEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError(userErrors.duplicateEmail);
    }
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(userErrors.notFound);
    }

    return user;
  }
}
