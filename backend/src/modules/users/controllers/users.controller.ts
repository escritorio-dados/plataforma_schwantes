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

import { JwtAuthGuard } from '#shared/guards/jwtAuth.guard';
import { IParamId } from '#shared/types/params';
import { ICurrentUser } from '#shared/types/request';

import { ChangePasswordUserDto } from '../dtos/changePassword.user.dto';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
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

  @Get()
  async listUsers() {
    return this.findAllUserService.execute();
  }

  @Get(':id')
  async getUser(@Param() { id }: IParamId) {
    return this.findOneUserService.execute(id);
  }

  @Post()
  async createUser(@Body() input: CreateUserDto) {
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
    return this.updateUserService.execute({ id, ...input, currentUser: user });
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param() { id }: IParamId, @Request() { user }: ICurrentUser) {
    await this.deleteUserService.execute({ id, currentUser: user });
  }
}
