import { Injectable } from '@nestjs/common';

import { AppError } from '#shared/errors/AppError';
import { elasticClient } from '#shared/services/elastic';

import { PublicationDto } from '../dtos/Publication.dto';
import { IPublication } from '../types/IPublication';

type IUpdatePublications = PublicationDto & { id: string };

@Injectable()
export class UpdatePublicationService {
  async execute({
    id,
    autor_first_name,
    autor_last_name,
    orientador_last_name,
    orientador_first_name,
    ...dados
  }: IUpdatePublications) {
    let orientador_full_name: string = null;

    if (orientador_first_name) {
      orientador_full_name = orientador_first_name;
    }

    if (orientador_last_name) {
      orientador_full_name = orientador_full_name
        ? `${orientador_full_name} ${orientador_last_name}`
        : orientador_last_name;
    }

    const body: IPublication = {
      ...dados,
      id,
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
      await elasticClient.index({ index: 'trabalhos', id, body });

      return body;
    } catch (error) {
      throw new AppError({ message: 'internal server error' });
    }
  }
}
