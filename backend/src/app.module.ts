import { Module } from '@nestjs/common';

import { ElasticModule } from '#modules/elastic/elastic.module';
import { UsersModule } from '#modules/users/users.module';

import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, UsersModule, ElasticModule],
})
export class AppModule {}
