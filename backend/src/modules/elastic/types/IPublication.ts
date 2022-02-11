export type IPublication = {
  id: string;
  ano: number;
  titulo: string;
  tipo_trabalho: string;
  resumo: string;
  link?: string;
  programa: string;
  campo: string;
  instituicao: string;
  tipo_instituicao: string;
  estado: string;
  palavras_chave?: string[];
  autor: { autor_full_name: string };
  orientador: { orientador_full_name: string };
};
