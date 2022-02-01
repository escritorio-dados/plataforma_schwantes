import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../dtos/create.user.dto';
import { HashProvider } from '../providers/hash.provider';
import { UsersRepository } from '../repositories/users.repository';
import { CommonUserService } from './common.user.service';

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private commonUserService: CommonUserService,
    private hashProvider: HashProvider,
  ) {}

  async execute({ email, password }: CreateUserDto) {
    // Validando se já existe um email cadastrado na organização
    await this.commonUserService.validadeEmail(email);

    // Gerando um Hash Da senha
    const hashedPassword = await this.hashProvider.generateHash(password);

    // Criando o usuario
    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return user;
  }
}
