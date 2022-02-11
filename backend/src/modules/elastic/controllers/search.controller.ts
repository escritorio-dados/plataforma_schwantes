import { Controller, Get, Param, Query } from '@nestjs/common';

import { SearchPublicationsQuery } from '../query/SearchPublications.query';
import { GetFilterOptionsService } from '../services/getFilterOptions.service';
import { GetPublicationsService } from '../services/getPublication.service';
import { SearchPublicationsService } from '../services/searchPublications.service';

@Controller('elastic')
export class SearchController {
  constructor(
    private searchPublicationsService: SearchPublicationsService,
    private getFilterOptionsService: GetFilterOptionsService,
    private getPublicationsService: GetPublicationsService,
  ) {}

  @Get('/search')
  async listPublications(@Query() query: SearchPublicationsQuery) {
    return this.searchPublicationsService.execute(query);
  }

  @Get('/search/filters')
  async getFilters() {
    return this.getFilterOptionsService.execute();
  }

  @Get('/doc/:id')
  async getDoc(@Param('id') id: string) {
    return this.getPublicationsService.execute(id);
  }
}
