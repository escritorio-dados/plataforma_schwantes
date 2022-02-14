import { Injectable } from '@nestjs/common';

import { AppError } from '#shared/errors/AppError';
import { elasticClient } from '#shared/services/elastic';

import { PublicationDto } from '../dtos/Publication.dto';
import { IPublication } from '../types/IPublication';

@Injectable()
export class CreatePublicationService {
  async execute({
    autor_first_name,
    autor_last_name,
    orientador_last_name,
    orientador_first_name,
    ...dados
  }: PublicationDto): Promise<IPublication> {
    let orientador_full_name: string;

    if (orientador_first_name) {
      orientador_full_name = orientador_first_name;
    }

    if (orientador_last_name) {
      orientador_full_name = orientador_full_name
        ? `${orientador_full_name} ${orientador_last_name}`
        : orientador_last_name;
    }

    const body: Omit<IPublication, 'id'> = {
      ...dados,
      autor: {
        autor_first_name,
        autor_last_name,
        autor_full_name: `${autor_first_name} ${autor_last_name}`,
      },
      orientador: {
        orientador_first_name,
        orientador_last_name,
        orientador_full_name,
      },
    };

    try {
      const response = await elasticClient.index({ index: 'trabalhos', body });

      return { id: response.body._id, ...body };
    } catch (error) {
      throw new AppError({ message: 'internal server error' });
    }
  }
}
