import { Injectable } from '@nestjs/common';

import { AppError } from '#shared/errors/AppError';

import { User } from '../entities/User';
import { userErrors } from '../errors/user.errors';
import { UsersRepository } from '../repositories/users.repository';
import { DEFAULT_USER_ID } from '../seeds/users.seeds';
import { CommonUserService } from './common.user.service';

type IDeleteUser = { id: string; currentUser: User };

@Injectable()
export class DeleteUserService {
  constructor(
    private usersRepository: UsersRepository,
    private commonUserService: CommonUserService,
  ) {}

  async execute({ id, currentUser }: IDeleteUser) {
    if (id === DEFAULT_USER_ID) {
      throw new AppError(userErrors.cannotBeDeleted);
    }

    if (id === currentUser.id) {
      throw new AppError(userErrors.cannotDeleteYourself);
    }

    const user = await this.commonUserService.getUser(id);

    await this.usersRepository.delete(user);
  }
}
