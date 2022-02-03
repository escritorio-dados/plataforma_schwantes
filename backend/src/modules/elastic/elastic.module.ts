import { Module } from '@nestjs/common';

import { SearchController } from './controllers/search.controller';
import { GetFilterOptionsService } from './services/getFilterOptions.service';
import { SearchPublicationsService } from './services/searchPublications.service';

@Module({
  controllers: [SearchController],
  providers: [SearchPublicationsService, GetFilterOptionsService],
})
export class ElasticModule {}
