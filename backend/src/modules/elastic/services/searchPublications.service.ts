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
  score: {
    field: '_score',
    order: 'desc',
  },
};

@Injectable()
export class SearchPublicationsService {
  async execute({
    page,
    sort,
    search,
    min_ano,
    max_ano,
    ...othersFilters
  }: SearchPublicationsQuery): Promise<IResponseApi> {
    const { field, order } = sortTranslate[sort];

    const noFilters = Object.values(othersFilters).length === 0 && !search && !min_ano && !max_ano;

    const query = noFilters ? { match_all: {} } : ({ bool: {} } as any);

    if (!noFilters) {
      if (search) {
        query.bool.must = [
          {
            multi_match: {
              query: search,
              type: 'phrase',
              fields: [
                'titulo',
                'autor.autor_full_name',
                'orientador.orientador_full_name',
                'resumo',
                'palavras_chave',
              ],
            },
          },
        ];
      }
    }

    const response = await elasticClient.search<IResponseElastic>({
      index: 'trabalhos',
      body: {
        from: (page - 1) * 10,
        size: 10,
        query,
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
