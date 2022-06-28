import { Injectable } from '@nestjs/common';

import { AppError } from '#shared/errors/AppError';
import { elasticClient } from '#shared/services/elastic';

import { publicationsErrors } from '../errors/publications.errors';
import { IPublication } from '../types/IPublication';

type IResponseElastic = { found: boolean; _id: string; _source?: IPublication };

type IPublicationApi = {
  _id: string;
  _source: IPublication;
};

type IResponseRandom = { hits: { hits: IPublicationApi[] } };

@Injectable()
export class GetPublicationsService {
  async execute(id: string): Promise<IPublication> {
    try {
      const response = await elasticClient.get<IResponseElastic>({ index: 'trabalhos', id });

      return {
        ...response.body._source,
        id: response.body._id,
      };
    } catch (error) {
      if ('body' in error && 'found' in error.body && !error.body.false) {
        throw new AppError(publicationsErrors.notFound);
      }

      throw new AppError({ message: 'internal server error' });
    }
  }

  async getRandom(quantity: number) {
    const query = {
      function_score: {
        functions: [
          {
            random_score: {},
          },
        ],
      },
    };

    try {
      const response = await elasticClient.search<IResponseRandom>({
        index: 'trabalhos',
        body: {
          size: quantity,
          query,
          _source: ['ano', 'titulo', 'tipo_trabalho', 'campo'],
        },
      });

      const publications = response.body.hits.hits.map((hit) => {
        return {
          id: hit._id,
          ...hit._source,
        };
      });

      return publications;
    } catch (error) {
      throw new AppError({ message: 'internal server error' });
    }
  }
}
