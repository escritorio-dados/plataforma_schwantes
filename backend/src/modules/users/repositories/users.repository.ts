import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/User';

type ICreateUser = { email: string; password: string };

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findById(id: string) {
    return this.repository.findOne(id);
  }

  async findAll() {
    return this.repository.find();
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async create(user: ICreateUser): Promise<User> {
    const newUser = this.repository.create(user);

    await this.repository.save(newUser);

    return newUser;
  }

  async delete(user: User): Promise<User> {
    await this.repository.remove(user);

    return user;
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
