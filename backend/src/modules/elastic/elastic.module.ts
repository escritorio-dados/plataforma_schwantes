import { Module } from '@nestjs/common';

import { SearchController } from './controllers/search.controller';
import { GetFilterOptionsService } from './services/getFilterOptions.service';
import { GetPublicationsService } from './services/getPublication.service';
import { SearchPublicationsService } from './services/searchPublications.service';

@Module({
  controllers: [SearchController],
  providers: [SearchPublicationsService, GetFilterOptionsService, GetPublicationsService],
})
export class ElasticModule {}
