import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AppError } from '#shared/errors/AppError';
import { JwtAuthGuard } from '#shared/guards/jwtAuth.guard';
import { IParamId } from '#shared/types/params';
import { ICurrentUser } from '#shared/types/request';

import { ChangePasswordUserDto } from '../dtos/changePassword.user.dto';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { User } from '../entities/User';
import { DEFAULT_USER_ID } from '../seeds/users.seeds';
import { CreateUserService } from '../services/create.user.service';
import { DeleteUserService } from '../services/delete.user.service';
import { FindAllUserService } from '../services/findAll.user.service';
import { FindOneUserService } from '../services/findOne.user.service';
import { UpdateUserService } from '../services/update.user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private findAllUserService: FindAllUserService,
    private findOneUserService: FindOneUserService,
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
  ) {}

  private validateAdminUser(user: User) {
    if (user.id !== DEFAULT_USER_ID) {
      throw new AppError({
        message: 'only admin user can access',
        userMessage: 'somente o usuario administrador pode acessar',
        statusCode: 401,
      });
    }
  }

  @Get()
  async listUsers(@Request() { user }: ICurrentUser) {
    this.validateAdminUser(user);

    return this.findAllUserService.execute();
  }

  @Get(':id')
  async getUser(@Param() { id }: IParamId, @Request() { user }: ICurrentUser) {
    this.validateAdminUser(user);

    return this.findOneUserService.execute(id);
  }

  @Post()
  async createUser(@Body() input: CreateUserDto, @Request() { user }: ICurrentUser) {
    this.validateAdminUser(user);

    return this.createUserService.execute(input);
  }

  @Patch('/me/password')
  async changeMyPassword(@Body() input: ChangePasswordUserDto, @Request() { user }: ICurrentUser) {
    return this.updateUserService.change_password({
      ...input,
      id: user.id,
    });
  }

  @Put(':id')
  async updateUser(
    @Param() { id }: IParamId,
    @Body() input: UpdateUserDto,
    @Request() { user }: ICurrentUser,
  ) {
    this.validateAdminUser(user);

    return this.updateUserService.execute({ id, ...input, currentUser: user });
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param() { id }: IParamId, @Request() { user }: ICurrentUser) {
    this.validateAdminUser(user);

    await this.deleteUserService.execute({ id, currentUser: user });
  }
}
