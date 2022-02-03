import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive } from 'class-validator';

type ISort = 'recente' | 'antigo';

export class SearchPublicationsQuery {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsIn(['recente', 'antigo'])
  @IsOptional()
  sort?: ISort = 'recente';
}
