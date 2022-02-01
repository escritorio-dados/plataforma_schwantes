import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { UsersServiceModule } from './users.service.module';

@Module({
  controllers: [UsersController, AuthController],
  imports: [UsersServiceModule],
})
export class UsersModule {}
