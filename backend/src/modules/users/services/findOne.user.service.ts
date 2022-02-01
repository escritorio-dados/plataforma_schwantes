import { Injectable } from '@nestjs/common';

import { User } from '../entities/User';
import { CommonUserService } from './common.user.service';

@Injectable()
export class FindOneUserService {
  constructor(private commonUserService: CommonUserService) {}

  async execute(id: string): Promise<User> {
    const user = await this.commonUserService.getUser(id);

    return user;
  }
}
