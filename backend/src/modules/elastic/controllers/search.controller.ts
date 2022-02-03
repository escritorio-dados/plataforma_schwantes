import { Controller, Get, Query } from '@nestjs/common';

import { SearchPublicationsQuery } from '../query/SearchPublications.query';
import { SearchPublicationsService } from '../services/searchPublications.service';

@Controller('elastic')
export class SearchController {
  constructor(private searchPublicationsService: SearchPublicationsService) {}

  @Get('/search')
  async listPublications(@Query() query: SearchPublicationsQuery) {
    return this.searchPublicationsService.execute(query);
  }
}
