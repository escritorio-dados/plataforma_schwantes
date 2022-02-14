import { Injectable } from '@nestjs/common';

import { AppError } from '#shared/errors/AppError';
import { elasticClient } from '#shared/services/elastic';

@Injectable()
export class DeletePublicationService {
  async execute(id: string) {
    try {
      await elasticClient.delete({ id, index: 'trabalhos' });
    } catch (error) {
      throw new AppError({ message: 'internal server error' });
    }
  }
}
