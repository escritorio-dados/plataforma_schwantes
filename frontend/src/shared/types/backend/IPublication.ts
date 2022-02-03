export type IPublication = {
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

export type IPublicationSearch = {
  pagination: { page: number; total: number; totalPages: number };
  data: IPublication[];
};
