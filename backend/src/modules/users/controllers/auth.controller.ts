import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { AuthDto } from '../dtos/auth.dto';
import { AuthService, IAuthType } from '../services/auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async auth(@Body() input: AuthDto): Promise<IAuthType> {
    return this.authService.validadeUser(input);
  }
}
