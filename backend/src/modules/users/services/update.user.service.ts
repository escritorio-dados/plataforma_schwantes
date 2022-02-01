import { Injectable } from '@nestjs/common';

import { AppError } from '#shared/errors/AppError';

import { ChangePasswordUserDto } from '../dtos/changePassword.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { User } from '../entities/User';
import { userErrors } from '../errors/user.errors';
import { HashProvider } from '../providers/hash.provider';
import { UsersRepository } from '../repositories/users.repository';
import { DEFAULT_USER_ID } from '../seeds/users.seeds';
import { CommonUserService } from './common.user.service';

type IUpdateUser = UpdateUserDto & { id: string; currentUser: User };

type IChangePasswordUser = ChangePasswordUserDto & { id: string };

@Injectable()
export class UpdateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private commonUserService: CommonUserService,
    private hashProvider: HashProvider,
  ) {}

  async change_password({ id, newPassword, oldPassword }: IChangePasswordUser) {
    const user = await this.commonUserService.getUser(id);

    const correctPassword = await this.hashProvider.compareHash(oldPassword, user.password);

    if (!correctPassword) {
      throw new AppError(userErrors.oldPasswordInvalid);
    }

    const newHash = await this.hashProvider.generateHash(newPassword);

    user.password = newHash;

    await this.usersRepository.save(user);

    return user;
  }

  async execute({ id, email, password, currentUser }: IUpdateUser): Promise<User> {
    const user = await this.commonUserService.getUser(id);

    // Impedindo de outros usuarios mudarem as informações do usuario raiz
    if (id === DEFAULT_USER_ID && currentUser.id !== id) {
      throw new AppError(userErrors.onlyRootUser);
    }

    // Validando se o e-mail já está em uso
    if (user.email !== email) {
      await this.commonUserService.validadeEmail(email);

      user.email = email;
    }

    // Colocando um Hash caso seja inserida uma nova senha
    if (password) {
      const hashedPassword = await this.hashProvider.generateHash(password);

      user.password = hashedPassword;
    }

    await this.usersRepository.save(user);

    return user;
  }
}
