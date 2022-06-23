import { Injectable } from '@nestjs/common';

import { AppError } from '#shared/errors/AppError';
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
      let alreadyHasMust = false;

      // Lidando com filtros de pesquisa
      if (search) {
        query.bool.must = [
          {
            multi_match: {
              query: search,
              type: 'phrase_prefix',
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

        alreadyHasMust = true;
      }

      // Lidando com filtros em algum metadata
      Object.entries(othersFilters).forEach(([key, filters]) => {
        const newFilter = {
          bool: {
            should: [],
          },
        };

        if (Array.isArray(filters)) {
          filters.forEach((filter) => {
            newFilter.bool.should.push({
              match_phrase: { [key]: filter },
            });
          });
        }

        if (alreadyHasMust) {
          query.bool.must.push(newFilter);
        } else {
          query.bool.must = [newFilter];

          alreadyHasMust = true;
        }
      });

      // Lidando com filtros de datas
      if (min_ano || max_ano) {
        query.bool.filter = [
          {
            range: {
              ano: {
                gte: min_ano || undefined,
                lte: max_ano || undefined,
              },
            },
          },
        ];
      }
    }

    try {
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
    } catch (error) {
      throw new AppError({ message: 'internal server error' });
    }
  }
}
