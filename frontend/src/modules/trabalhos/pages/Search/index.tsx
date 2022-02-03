import {
  AccordionDetails,
  Autocomplete,
  Box,
  Button,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { IPublicationSearch, ISearchFilters } from '#shared/types/backend/IPublication';

import {
  FilterContainer,
  FilterContent,
  FilterTitle,
  PaginationContainer,
  Publication,
  PublicationTags,
  ResultsInfo,
} from './styles';

type IPublicationFormat = {
  id: string;
  tipo_trabalho: string;
  ano: number;
  titulo: string;
  resumo: string;
  autor: string;
};

type IFilters = {
  text: string;
  tipos_trabalho: string[];
  tipo_instituicao?: string[];
  estado?: string[];
  instituicao?: string[];
  programa?: string[];
  campo?: string[];
  min_ano?: number;
  max_ano?: number;
};

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterExpanded, setFilterExpanded] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [sort, setSort] = useState(() => {
    const sortParams = searchParams.get('sort');

    if (!!sortParams && ['recente', 'antigo'].includes(sortParams)) {
      return sortParams;
    }

    return 'recente';
  });
  const [filters, setFilters] = useState<IFilters>(() => {
    return {
      text: searchParams.get('query') || '',
      tipos_trabalho: [],
      tipo_instituicao: [],
      estado: [],
      instituicao: [],
      programa: [],
      campo: [],
    };
  });

  const { toast } = useToast();

  const { error, loading, data, send } = useGet<IPublicationSearch>({
    url: '/elastic/search',
    lazy: true,
  });

  const {
    error: filterErrors,
    loading: filterLoading,
    data: filterData,
  } = useGet<ISearchFilters>({ url: '/elastic/search/filters' });

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

      return;
    }

    if (filterErrors) {
      toast({ message: filterErrors, severity: 'error' });
    }
  }, [error, filterErrors, toast]);

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

  const updateFilters = useCallback((field: string, value: any) => {
    setFilters((old) => ({
      ...old,
      [field]: value,
    }));
  }, []);

  if (loading) return <Loading loading={loading} />;

  if (filterLoading) return <Loading loading={filterLoading} />;

  return (
    <>
      {/* Informações sobre o resultado */}
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

      {/* Filtro */}
      <Box sx={{ marginBottom: '2em', display: { xs: 'flex', lg: 'none' } }}>
        <FilterContainer
          expanded={filterExpanded}
          onChange={() => setFilterExpanded((old) => !old)}
        >
          <FilterTitle>
            <Typography>Filtros</Typography>
          </FilterTitle>

          <AccordionDetails>
            <FilterContent>
              <TextField
                fullWidth
                label="Pesquisar"
                variant="outlined"
                value={filters.text}
                onBlur={(e) => updateFilters('text', e.target.value)}
              />

              {filterData && (
                <Autocomplete
                  multiple
                  options={filterData.tipos_trabalho}
                  value={filters.tipos_trabalho}
                  onChange={(e, newValue) => updateFilters('tipos_trabalho', newValue)}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de Trabalho"
                      inputProps={{
                        ...params.inputProps,
                      }}
                      sx={{ marginTop: '1em' }}
                    />
                  )}
                />
              )}

              <Button className="filter" variant="contained">
                Aplicar Filtros
              </Button>
            </FilterContent>
          </AccordionDetails>
        </FilterContainer>
      </Box>

      {/* Resultados */}
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

      {/* Páginação */}
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
