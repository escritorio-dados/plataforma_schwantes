import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class PublicationDto {
  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  tipo_trabalho: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  ano: number;

  @IsOptional()
  @IsNotEmpty()
  resumo?: string;

  @IsOptional()
  @IsNotEmpty()
  link?: string;

  @IsNotEmpty()
  programa: string;

  @IsNotEmpty()
  campo: string;

  @IsNotEmpty()
  instituicao: string;

  @IsNotEmpty()
  tipo_instituicao: string;

  @IsNotEmpty()
  estado: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  palavras_chave?: string[];

  @IsNotEmpty()
  autor_first_name: string;

  @IsNotEmpty()
  autor_last_name: string;

  @IsOptional()
  @IsNotEmpty()
  orientador_first_name?: string;

  @IsOptional()
  @IsNotEmpty()
  orientador_last_name?: string;
}
