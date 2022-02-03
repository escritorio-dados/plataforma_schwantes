import { Controller, Get, Query } from '@nestjs/common';

import { SearchPublicationsQuery } from '../query/SearchPublications.query';
import { GetFilterOptionsService } from '../services/getFilterOptions.service';
import { SearchPublicationsService } from '../services/searchPublications.service';

@Controller('elastic')
export class SearchController {
  constructor(
    private searchPublicationsService: SearchPublicationsService,
    private getFilterOptionsService: GetFilterOptionsService,
  ) {}

  @Get('/search')
  async listPublications(@Query() query: SearchPublicationsQuery) {
    return this.searchPublicationsService.execute(query);
  }

  @Get('/search/filters')
  async getFilters() {
    return this.getFilterOptionsService.execute();
  }
}
