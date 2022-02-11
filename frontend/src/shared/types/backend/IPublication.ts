export type IPublicationSearch = {
  _id: string;
  _source: {
    tipo_trabalho: string;
    ano: number;
    titulo: string;
    resumo?: string;
    autor: {
      autor_full_name: string;
    };
  };
};

export type IPublicationsSearch = {
  pagination: { page: number; total: number; totalPages: number };
  data: IPublicationSearch[];
};

export type ISearchFilters = {
  tipo_instituicao: string[];
  estado: string[];
  instituicao: string[];
  tipo_trabalho: string[];
  programa: string[];
  campo: string[];
  ano: { min: number; max: number };
};

export type IPublication = {
  id: string;
  ano: number;
  titulo: string;
  tipo_trabalho: string;
  resumo?: string;
  link?: string;
  programa: string;
  campo: string;
  instituicao: string;
  tipo_instituicao: string;
  estado: string;
  palavras_chave?: string[];
  autor: { autor_full_name: string };
  orientador: { orientador_full_name?: string };
};
