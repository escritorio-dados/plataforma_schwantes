import { Module } from '@nestjs/common';

import { SearchController } from './controllers/search.controller';
import { CreatePublicationService } from './services/createPublication.service';
import { DeletePublicationService } from './services/deletePublication.service';
import { GetFilterOptionsService } from './services/getFilterOptions.service';
import { GetPublicationsService } from './services/getPublication.service';
import { SearchPublicationsService } from './services/searchPublications.service';
import { UpdatePublicationService } from './services/updatePublication.service';

@Module({
  controllers: [SearchController],
  providers: [
    SearchPublicationsService,
    GetFilterOptionsService,
    GetPublicationsService,
    CreatePublicationService,
    UpdatePublicationService,
    DeletePublicationService,
  ],
})
export class ElasticModule {}
