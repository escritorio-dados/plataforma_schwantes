import { FormControl, MenuItem, Pagination, Select, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { IPublicationSearch } from '#shared/types/backend/IPublication';

import { PaginationContainer, Publication, PublicationTags, ResultsInfo } from './styles';

type IPublicationFormat = {
  id: string;
  tipo_trabalho: string;
  ano: number;
  titulo: string;
  resumo: string;
  autor: string;
};

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [sort, setSort] = useState(() => {
    const sortParams = searchParams.get('sort');

    if (!!sortParams && ['recente', 'antigo'].includes(sortParams)) {
      return sortParams;
    }

    return 'recente';
  });

  const { toast } = useToast();

  const { error, loading, data, send } = useGet<IPublicationSearch>({
    url: '/elastic/search',
    lazy: true,
    config: {
      params: { page },
    },
  });

  useEffect(() => {
    searchParams.set('page', String(page));

    searchParams.set('sort', sort);

    setSearchParams(searchParams);

    send({ params: { page, sort } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, send, sort]);

  useEffect(() => {
    if (error) {
      toast({ message: error, severity: 'error' });
    }
  }, [error, toast]);

  const publications = useMemo<IPublicationFormat[]>(() => {
    if (!data) {
      return [];
    }

    return data.data.map<IPublicationFormat>((publication) => {
      return {
        id: publication._id,
        ano: publication._source.ano,
        autor: publication._source.autor.autor_full_name,
        tipo_trabalho: publication._source.tipo_trabalho,
        titulo: publication._source.titulo,
        resumo: publication._source.resumo
          ? `${publication._source.resumo.substring(0, 350)}...`
          : 'Sem Resumo',
      };
    });
  }, [data]);

  const totalResults = useMemo<number>(() => {
    if (!data) {
      return 0;
    }

    return data.pagination.total;
  }, [data]);

  const totalPages = useMemo<number>(() => {
    if (!data) {
      return 1;
    }

    return data.pagination.totalPages;
  }, [data]);

  if (loading) return <Loading loading={loading} />;

  return (
    <>
      <ResultsInfo>
        <div className="total">
          <Typography component="span">{totalResults}</Typography>

          <Typography>Resultados Encontrados</Typography>
        </div>

        <div className="sort">
          <FormControl fullWidth>
            <Select id="demo-simple-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="recente">Mais Recentes</MenuItem>
              <MenuItem value="antigo">Mais Antigos</MenuItem>
            </Select>
          </FormControl>
        </div>
      </ResultsInfo>

      {publications.map((publication) => (
        <Publication key={publication.id}>
          <PublicationTags>
            <Typography component="span" className="ano">
              {publication.ano}
            </Typography>

            <Typography component="span" className="tipo">
              {publication.tipo_trabalho}
            </Typography>
          </PublicationTags>

          <Typography variant="h4" className="title">
            {publication.titulo}
          </Typography>

          <Typography className="autor">{publication.autor}</Typography>

          <Typography className="resumo">{publication.resumo}</Typography>
        </Publication>
      ))}

      <PaginationContainer>
        <Pagination
          variant="outlined"
          shape="rounded"
          count={totalPages}
          page={page}
          onChange={(e, p) => setPage(p)}
        />
      </PaginationContainer>
    </>
  );
}
