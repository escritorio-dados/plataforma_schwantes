import {
  AccordionDetails,
  Autocomplete,
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
  ResponsiveContent,
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
  search: string;
  min_ano: string;
  max_ano: string;
  tipo_trabalho: string[];
  tipo_instituicao: string[];
  estado: string[];
  instituicao: string[];
  programa: string[];
  campo: string[];
};

const filterFields = {
  array: ['tipo_trabalho', 'tipo_instituicao', 'estado', 'instituicao', 'programa', 'campo'],
  unique: ['search', 'min_ano', 'max_ano'],
};

const defaultFilters: IFilters = {
  campo: [],
  estado: [],
  instituicao: [],
  max_ano: '',
  min_ano: '',
  programa: [],
  search: '',
  tipo_instituicao: [],
  tipo_trabalho: [],
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
    const filtersObject = {} as any;

    filterFields.array.forEach((field) => {
      filtersObject[field] = searchParams.getAll(field).map(decodeURI);
    });

    filterFields.unique.forEach((field) => {
      filtersObject[field] = decodeURI(searchParams.get(field) || '');
    });

    return filtersObject;
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

  const applyFilters = useCallback(() => {
    Object.entries(filters).forEach(([key, filter]) => {
      if (Array.isArray(filter)) {
        searchParams.delete(key);

        filter.forEach((value) => {
          searchParams.append(key, encodeURI(value));
        });
      } else {
        searchParams.set(key, encodeURI(filter));
      }
    });

    setSearchParams(searchParams);
  }, [filters, searchParams, setSearchParams]);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);

    Object.keys(defaultFilters).forEach((key) => {
      searchParams.delete(key);
    });

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  if (loading) return <Loading loading={loading} />;

  if (filterLoading) return <Loading loading={filterLoading} />;

  return (
    <>
      {/* Informações sobre o resultado */}
      <ResultsInfo>
        <div className="filter-area" />

        <div className="results">
          <div className="total">
            <Typography component="span">{totalResults}</Typography>

            <Typography>Resultados Encontrados</Typography>
          </div>

          <div className="sort">
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="recente">Mais Recentes</MenuItem>
                <MenuItem value="antigo">Mais Antigos</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </ResultsInfo>

      <ResponsiveContent>
        <div className="filter">
          {/* Filtro */}
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
                  value={filters.search}
                  onChange={(e) => updateFilters('search', e.target.value)}
                />

                {filterData && (
                  <>
                    <Autocomplete
                      multiple
                      options={filterData.tipo_trabalho}
                      value={filters.tipo_trabalho}
                      onChange={(e, newValue) => updateFilters('tipo_trabalho', newValue)}
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

                    <Autocomplete
                      multiple
                      options={filterData.campo}
                      value={filters.campo}
                      onChange={(e, newValue) => updateFilters('campo', newValue)}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Campo"
                          inputProps={{
                            ...params.inputProps,
                          }}
                          sx={{ marginTop: '1em' }}
                        />
                      )}
                    />

                    <Autocomplete
                      multiple
                      options={filterData.tipo_instituicao}
                      value={filters.tipo_instituicao}
                      onChange={(e, newValue) => updateFilters('tipo_instituicao', newValue)}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tipo de Instituição"
                          inputProps={{
                            ...params.inputProps,
                          }}
                          sx={{ marginTop: '1em' }}
                        />
                      )}
                    />

                    <Autocomplete
                      multiple
                      options={filterData.instituicao}
                      value={filters.instituicao}
                      onChange={(e, newValue) => updateFilters('instituicao', newValue)}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Instituição"
                          inputProps={{
                            ...params.inputProps,
                          }}
                          sx={{ marginTop: '1em' }}
                        />
                      )}
                    />

                    <Autocomplete
                      multiple
                      options={filterData.programa}
                      value={filters.programa}
                      onChange={(e, newValue) => updateFilters('programa', newValue)}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Programa"
                          inputProps={{
                            ...params.inputProps,
                          }}
                          sx={{ marginTop: '1em' }}
                        />
                      )}
                    />

                    <Autocomplete
                      multiple
                      options={filterData.estado}
                      value={filters.estado}
                      onChange={(e, newValue) => updateFilters('estado', newValue)}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Estado"
                          inputProps={{
                            ...params.inputProps,
                          }}
                          sx={{ marginTop: '1em' }}
                        />
                      )}
                    />

                    <div className="ano">
                      <TextField
                        fullWidth
                        sx={{ marginRight: '0.5em' }}
                        label="Ano Inicial"
                        variant="outlined"
                        value={filters.min_ano}
                        onChange={(e) =>
                          updateFilters('min_ano', e.target.value.replace(/\D*/g, ''))
                        }
                        helperText={`EX: ${filterData.ano.min}`}
                      />

                      <TextField
                        fullWidth
                        label="Ano Final"
                        variant="outlined"
                        sx={{ marginLeft: '0.5em' }}
                        value={filters.max_ano}
                        onChange={(e) =>
                          updateFilters('max_ano', e.target.value.replace(/\D*/g, ''))
                        }
                        helperText={`EX: ${filterData.ano.max}`}
                      />
                    </div>
                  </>
                )}

                <Button className="filter" variant="contained" onClick={applyFilters}>
                  Aplicar Filtros
                </Button>

                <Button className="clear" variant="contained" onClick={clearFilters}>
                  Limpar
                </Button>
              </FilterContent>
            </AccordionDetails>
          </FilterContainer>
        </div>

        <div className="content">
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
        </div>
      </ResponsiveContent>
    </>
  );
}
