import { Injectable } from '@nestjs/common';

import { elasticClient } from '#shared/services/elastic';

type IElasticValue = { buckets: Array<{ key: string; doc_count: number }> };

type IElasticValueAno = { value: number };

type IFilterElastic = {
  aggregations: {
    tipo_instituicao: IElasticValue;
    estado: IElasticValue;
    instituicao: IElasticValue;
    tipo_trabalho: IElasticValue;
    programa: IElasticValue;
    campo: IElasticValue;
    min_ano: IElasticValueAno;
    max_ano: IElasticValueAno;
  };
};

type IResponseApi = {
  tipo_instituicao: string[];
  estado: string[];
  instituicao: string[];
  tipo_trabalho: string[];
  programa: string[];
  campo: string[];
  ano: { min: number; max: number };
};

@Injectable()
export class GetFilterOptionsService {
  private formatResponse(response: IFilterElastic): IResponseApi {
    const formatted = {} as IResponseApi;

    Object.entries(response.aggregations).forEach(([key, value]) => {
      if ('buckets' in value) {
        formatted[key] = value.buckets.map<string>((bucket) => bucket.key);
      }
    });

    formatted.ano = {
      min: response.aggregations.min_ano.value,
      max: response.aggregations.max_ano.value,
    };

    return formatted;
  }

  async execute(): Promise<IResponseApi> {
    const response = await elasticClient.search<IFilterElastic>({
      index: 'trabalhos',
      body: {
        size: 0,
        aggs: {
          tipo_trabalho: {
            terms: {
              field: 'tipo_trabalho.keyword',
              size: 100,
            },
          },
          programa: {
            terms: {
              field: 'programa.keyword',
              size: 100,
            },
          },
          campo: {
            terms: {
              field: 'campo.keyword',
              size: 100,
            },
          },
          instituicao: {
            terms: {
              field: 'instituicao.keyword',
              size: 100,
            },
          },
          tipo_instituicao: {
            terms: {
              field: 'tipo_instituicao.keyword',
              size: 100,
            },
          },
          estado: {
            terms: {
              field: 'estado.keyword',
              size: 100,
            },
          },
          min_ano: {
            min: {
              field: 'ano',
            },
          },
          max_ano: {
            max: {
              field: 'ano',
            },
          },
        },
      },
    });

    return this.formatResponse(response.body);
  }
}
