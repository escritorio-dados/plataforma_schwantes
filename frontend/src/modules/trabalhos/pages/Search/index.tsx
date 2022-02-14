import { yupResolver } from '@hookform/resolvers/yup';
import { Delete, Edit } from '@mui/icons-material';
import {
  AccordionDetails,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';

import { FormAutoComplete } from '#shared/components/form/FormAutoComplete';
import { FormTextField } from '#shared/components/form/FormTextField';
import { Loading } from '#shared/components/Loading';
import { useAuth } from '#shared/hooks/auth';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import {
  IPublicationSearch,
  IPublicationsSearch,
  ISearchFilters,
} from '#shared/types/backend/IPublication';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { DeletePublicationModal } from '#modules/trabalhos/components/DeletePublication';
import { UpdatePublicationModal } from '#modules/trabalhos/components/UpdatePublication';
import { ISearchSchema, SearchSchema } from '#modules/trabalhos/schemas/search.schema';

import {
  FilterContainer,
  FilterContent,
  FilterTitle,
  PaginationContainer,
  Publication,
  PublicationActions,
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

const filterFields = {
  array: ['tipo_trabalho', 'tipo_instituicao', 'estado', 'instituicao', 'programa', 'campo'],
  unique: ['search', 'min_ano', 'max_ano'],
};

type IDeleteModal = { id: string; titulo: string } | null;

export function Search() {
  const [updateModal, setUpdateModal] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<IDeleteModal>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterExpanded, setFilterExpanded] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [sort, setSort] = useState(() => {
    const sortParams = searchParams.get('sort');

    if (!!sortParams && ['recente', 'antigo', 'score'].includes(sortParams)) {
      return sortParams;
    }

    return 'recente';
  });

  const { toast } = useToast();
  const { logged } = useAuth();

  const {
    error,
    loading,
    data,
    send,
    updateData: updateSearchPublications,
  } = useGet<IPublicationsSearch>({
    url: '/elastic/search',
    lazy: true,
  });

  const {
    error: filterErrors,
    loading: filterLoading,
    data: filterData,
  } = useGet<ISearchFilters>({ url: '/elastic/search/filters' });

  const activeFilters = useMemo(() => {
    const defaultFilters = {} as any;

    filterFields.array.forEach((field) => {
      defaultFilters[field] = searchParams.getAll(field).map(decodeURI);
    });

    filterFields.unique.forEach((field) => {
      defaultFilters[field] = decodeURI(searchParams.get(field) || '');
    });

    return defaultFilters as ISearchSchema;
  }, [searchParams]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISearchSchema>({
    resolver: yupResolver(SearchSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: activeFilters,
  });

  useEffect(() => {
    searchParams.set('page', String(page));

    searchParams.set('sort', sort);

    setSearchParams(searchParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort]);

  useEffect(() => {
    send({ params: { page, sort, ...removeEmptyFields(activeFilters) } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const applyFilters = useCallback(
    (formData: ISearchSchema) => {
      removeEmptyFields(formData);

      Object.entries(formData).forEach(([key, filter]) => {
        if (Array.isArray(filter)) {
          searchParams.delete(key);

          filter.forEach((value) => {
            searchParams.append(key, encodeURI(value));
          });
        } else if (filter) {
          searchParams.set(key, encodeURI(filter));
        } else {
          searchParams.delete(key);
        }
      });

      setPage(1);
      setSort('score');

      setSearchParams(searchParams);

      send({ params: { page: 1, sort: 'score', ...formData } });
    },
    [searchParams, send, setSearchParams],
  );

  const clearFilters = useCallback(() => {
    reset({
      campo: [],
      estado: [],
      instituicao: [],
      max_ano: '',
      min_ano: '',
      programa: [],
      search: '',
      tipo_instituicao: [],
      tipo_trabalho: [],
    });

    Object.values(filterFields).forEach((value) => {
      value.forEach((key) => {
        searchParams.delete(key);
      });
    });

    setSearchParams(searchParams);
    setPage(1);
    setSort('recente');

    send({ params: { page: 1, sort: 'recente' } });
  }, [reset, searchParams, send, setSearchParams]);

  const changePage = useCallback(
    (newPage: number) => {
      setPage(newPage);

      send({ params: { page: newPage, sort, ...removeEmptyFields(activeFilters) } });
    },
    [activeFilters, send, sort],
  );

  const changeSort = useCallback(
    (newSort: string) => {
      setSort(newSort);

      send({ params: { page, sort: newSort, ...removeEmptyFields(activeFilters) } });
    },
    [activeFilters, page, send],
  );

  const handleChange = useCallback(
    (newData: IPublicationSearch) => {
      updateSearchPublications((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          data: current.data.map((p) => {
            if (p._id === newData._id) {
              return { ...p, ...newData };
            }

            return p;
          }),
        };
      });
    },
    [updateSearchPublications],
  );

  const handleDeletion = useCallback(
    (id: string) => {
      updateSearchPublications((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          data: current.data.filter((p) => p._id !== id),
        };
      });
    },
    [updateSearchPublications],
  );

  if (loading) return <Loading loading={loading} />;

  if (filterLoading) return <Loading loading={filterLoading} />;

  return (
    <>
      {!!updateModal && (
        <UpdatePublicationModal
          openModal={!!updateModal}
          closeModal={() => setUpdateModal(null)}
          doc_id={updateModal || ''}
          handleChange={handleChange}
        />
      )}

      {!!deleteModal && (
        <DeletePublicationModal
          openModal={!!deleteModal}
          closeModal={() => setDeleteModal(null)}
          publication={deleteModal}
          handleDeletion={handleDeletion}
        />
      )}

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
              <Select id="sort" value={sort} onChange={(e) => changeSort(e.target.value)}>
                <MenuItem value="recente">Mais Recentes</MenuItem>
                <MenuItem value="antigo">Mais Antigos</MenuItem>
                <MenuItem value="score">Maior Relevância</MenuItem>
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
                <form onSubmit={handleSubmit(applyFilters)} noValidate>
                  <FormTextField
                    name="search"
                    label="Pesquisar"
                    control={control}
                    margin_type="no-margin"
                    errors={errors.search}
                  />

                  {filterData && (
                    <>
                      <FormAutoComplete
                        multiple
                        control={control}
                        name="tipo_trabalho"
                        label="Tipo de Trabalho"
                        options={filterData.tipo_trabalho}
                        errors={errors.tipo_trabalho}
                      />

                      <FormAutoComplete
                        multiple
                        control={control}
                        name="campo"
                        label="Campo"
                        options={filterData.campo}
                        errors={errors.campo}
                      />

                      <FormAutoComplete
                        multiple
                        control={control}
                        name="tipo_instituicao"
                        label="Tipo de Instituição"
                        options={filterData.tipo_instituicao}
                        errors={errors.tipo_instituicao}
                      />

                      <FormAutoComplete
                        multiple
                        control={control}
                        name="instituicao"
                        label="Instituição"
                        options={filterData.instituicao}
                        errors={errors.instituicao}
                      />

                      <FormAutoComplete
                        multiple
                        control={control}
                        name="programa"
                        label="Programa"
                        options={filterData.programa}
                        errors={errors.programa}
                      />

                      <FormAutoComplete
                        multiple
                        control={control}
                        name="estado"
                        label="Estado"
                        options={filterData.estado}
                        errors={errors.estado}
                      />

                      <div className="ano">
                        <FormTextField
                          name="min_ano"
                          label="Ano Inicial"
                          control={control}
                          margin_type="no-margin"
                          errors={errors.min_ano}
                          helperText={`EX: ${filterData.ano.min}`}
                        />

                        <FormTextField
                          name="max_ano"
                          label="Ano Final"
                          control={control}
                          margin_type="left-margin"
                          errors={errors.max_ano}
                          helperText={`EX: ${filterData.ano.max}`}
                        />
                      </div>
                    </>
                  )}

                  <Button type="submit" className="filter" variant="contained">
                    Aplicar Filtros
                  </Button>

                  <Button className="clear" variant="contained" onClick={clearFilters}>
                    Limpar
                  </Button>
                </form>
              </FilterContent>
            </AccordionDetails>
          </FilterContainer>
        </div>

        <div className="content">
          {/* Resultados */}
          {publications.map((publication) => (
            <Publication key={publication.id} elevation={3}>
              <PublicationTags>
                <Typography component="span" className="ano">
                  {publication.ano}
                </Typography>

                <Typography component="span" className="tipo">
                  {publication.tipo_trabalho}
                </Typography>
              </PublicationTags>

              <Link to={`/doc/${publication.id}`}>
                <Typography variant="h4" className="title">
                  {publication.titulo}
                </Typography>
              </Link>

              <Typography className="autor">{publication.autor}</Typography>

              <Typography className="resumo">{publication.resumo}</Typography>

              {logged && (
                <PublicationActions>
                  <Tooltip title="Editar Publicação">
                    <IconButton onClick={() => setUpdateModal(publication.id)}>
                      <Edit sx={{ color: blue[500] }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Deletar Publicação">
                    <IconButton
                      onClick={() =>
                        setDeleteModal({ id: publication.id, titulo: publication.titulo })
                      }
                    >
                      <Delete sx={{ color: red[500] }} />
                    </IconButton>
                  </Tooltip>
                </PublicationActions>
              )}
            </Publication>
          ))}

          {/* Páginação */}
          <PaginationContainer>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={totalPages}
              page={page}
              onChange={(e, p) => changePage(p)}
            />
          </PaginationContainer>
        </div>
      </ResponsiveContent>
    </>
  );
}
