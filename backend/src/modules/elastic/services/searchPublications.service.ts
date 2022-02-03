import { Injectable } from '@nestjs/common';

import { elasticClient } from '#shared/services/elastic';

import { SearchPublicationsQuery } from '../query/SearchPublications.query';

type IPublication = {
  _id: string;
  _source: {
    tipo_trabalho: string;
    ano: number;
    titulo: string;
    resumo: string;
    autor: { autor_full_name: string };
  };
};

type IResponseElastic = { hits: { total: { value: number }; hits: IPublication[] } };

type IResponseApi = {
  pagination: { page: number; totalPages: number; total: number };
  data: IPublication[];
};

const sortTranslate = {
  antigo: {
    field: 'ano',
    order: 'asc',
  },
  recente: {
    field: 'ano',
    order: 'desc',
  },
};

@Injectable()
export class SearchPublicationsService {
  async execute({ page, sort }: SearchPublicationsQuery): Promise<IResponseApi> {
    const { field, order } = sortTranslate[sort];

    const response = await elasticClient.search<IResponseElastic>({
      index: 'trabalhos',
      body: {
        from: (page - 1) * 10,
        size: 10,
        query: {
          match_all: {},
        },
        _source: ['ano', 'titulo', 'tipo_trabalho', 'resumo', 'autor.autor_full_name'],
        sort: [
          {
            [field]: {
              order,
            },
          },
        ],
      },
    });

    const publications: IPublication[] = response.body.hits.hits;

    const totalResults = response.body.hits.total.value;

    const totalPages = Math.ceil(totalResults / 10);

    return {
      pagination: { page, totalPages, total: totalResults },
      data: publications,
    };
  }
}
