import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

type ISort = 'recente' | 'antigo' | 'score';

export class SearchPublicationsQuery {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsIn(['recente', 'antigo', 'score'])
  @IsOptional()
  sort?: ISort = 'recente';

  @IsNotEmpty()
  @IsOptional()
  search?: string;

  @IsArray()
  @IsOptional()
  tipo_instituicao?: string[];

  @IsArray()
  @IsOptional()
  estado?: string[];

  @IsArray()
  @IsOptional()
  instituicao?: string[];

  @IsArray()
  @IsOptional()
  tipo_trabalho?: string[];

  @IsArray()
  @IsOptional()
  programa?: string[];

  @IsArray()
  @IsOptional()
  campo?: string[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  min_ano?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  max_ano?: number;
}
