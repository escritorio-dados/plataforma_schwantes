import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class RandomPublicationsQuery {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  quantity?: number = 4;
}
