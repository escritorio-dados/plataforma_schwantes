import { Module } from '@nestjs/common';

import { SearchController } from './controllers/search.controller';
import { SearchPublicationsService } from './services/searchPublications.service';

@Module({
  controllers: [SearchController],
  providers: [SearchPublicationsService],
})
export class ElasticModule {}
