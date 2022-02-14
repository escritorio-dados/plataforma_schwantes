import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { PublicationDto } from '../dtos/Publication.dto';
import { SearchPublicationsQuery } from '../query/SearchPublications.query';
import { CreatePublicationService } from '../services/createPublication.service';
import { DeletePublicationService } from '../services/deletePublication.service';
import { GetFilterOptionsService } from '../services/getFilterOptions.service';
import { GetPublicationsService } from '../services/getPublication.service';
import { SearchPublicationsService } from '../services/searchPublications.service';
import { UpdatePublicationService } from '../services/updatePublication.service';

@Controller('elastic')
export class SearchController {
  constructor(
    private searchPublicationsService: SearchPublicationsService,
    private getFilterOptionsService: GetFilterOptionsService,
    private getPublicationsService: GetPublicationsService,
    private cratePublicationService: CreatePublicationService,
    private updatePublicationService: UpdatePublicationService,
    private deletePublicationService: DeletePublicationService,
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

  @Post('/doc')
  async createDoc(@Body() input: PublicationDto) {
    return this.cratePublicationService.execute(input);
  }

  @Put('/doc/:id')
  async updateDoc(@Param('id') id: string, @Body() input: PublicationDto) {
    return this.updatePublicationService.execute({ id, ...input });
  }

  @Delete('/doc/:id')
  async deleteDoc(@Param('id') id: string) {
    await this.deletePublicationService.execute(id);
  }
}
