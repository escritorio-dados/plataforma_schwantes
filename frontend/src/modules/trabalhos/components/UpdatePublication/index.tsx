import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { FormAutoComplete } from '#shared/components/form/FormAutoComplete';
import { FormTextField } from '#shared/components/form/FormTextField';
import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { useGet, usePut } from '#shared/services/useAxios';
import {
  IPublication,
  IPublicationInput,
  IPublicationSearch,
  ISearchFilters,
} from '#shared/types/backend/IPublication';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IDocSchema, docSchema } from '#modules/trabalhos/schemas/doc.schema';

import { HorizontalFields, PublicationForm } from './styles';

type IUpdatePublicationModal = {
  openModal: boolean;
  closeModal: () => void;
  doc_id: string;
  handleChange(data: IPublicationSearch): void;
};

export function UpdatePublicationModal({
  closeModal,
  doc_id,
  openModal,
  handleChange,
}: IUpdatePublicationModal) {
  const { toast } = useToast();

  const {
    error: publicationError,
    loading: publicationLoading,
    data: publication,
  } = useGet<IPublication>({ url: `/elastic/doc/${doc_id}` });

  const {
    error: filterErrors,
    loading: filterLoading,
    data: filterData,
  } = useGet<ISearchFilters>({ url: '/elastic/search/filters' });

  const { loading: updateLoading, send: updatePublication } = usePut<
    IPublication,
    IPublicationInput
  >(`/elastic/doc/${doc_id}`);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IDocSchema>({
    resolver: yupResolver(docSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (publicationError) {
      toast({ message: publicationError, severity: 'error' });

      closeModal();
    }

    if (filterErrors) {
      toast({ message: filterErrors, severity: 'error' });

      closeModal();
    }
  }, [publicationError, filterErrors, toast, closeModal]);

  const defaultPublication = useMemo(() => {
    if (publication) {
      return {
        ...publication,
        ano: publication.ano.toString(),
        autor_first_name: publication.autor.autor_first_name,
        autor_last_name: publication.autor.autor_last_name,
        orientador_first_name: publication.orientador.orientador_first_name,
        orientador_last_name: publication.orientador.orientador_last_name,
      } as IDocSchema;
    }

    return {} as IDocSchema;
  }, [publication]);

  const handleUpdate = useCallback(
    async (input: IDocSchema) => {
      removeEmptyFields(input);

      const { error, data } = await updatePublication({ ...input, ano: Number(input.ano) });

      if (error) {
        toast({ message: error, severity: 'error' });

        return;
      }

      if (data) {
        toast({ message: 'publicação atualizada', severity: 'success' });

        handleChange({ _id: data.id, _source: data });
      }

      closeModal();
    },
    [closeModal, handleChange, toast, updatePublication],
  );

  if (publicationLoading) return <Loading loading={publicationLoading} />;

  if (filterLoading) return <Loading loading={filterLoading} />;

  if (!publication) return <div />;

  return (
    <Dialog open={openModal} maxWidth="lg" fullWidth onClose={closeModal}>
      <Loading loading={updateLoading} />

      <PublicationForm elevation={3}>
        <Typography component="h2">Atualizar Publicação</Typography>

        <form onSubmit={handleSubmit(handleUpdate)} noValidate>
          <FormTextField
            required
            control={control}
            name="titulo"
            label="Titulo"
            margin_type="no-margin"
            errors={errors.titulo}
            defaultValue={defaultPublication.titulo}
          />

          <FormAutoComplete
            required
            freeSolo
            control={control}
            name="tipo_trabalho"
            label="Tipo de Trabalho"
            options={filterData?.tipo_trabalho || null}
            errors={errors.tipo_trabalho}
            defaultValue={defaultPublication.tipo_trabalho}
          />

          <FormTextField
            required
            control={control}
            name="ano"
            label="Ano"
            errors={errors.ano}
            defaultValue={defaultPublication.ano}
          />

          <FormTextField
            multiline
            control={control}
            name="resumo"
            label="Resumo"
            errors={errors.resumo}
            defaultValue={defaultPublication.resumo}
          />

          <FormTextField
            control={control}
            name="link"
            label="Link"
            errors={errors.link}
            defaultValue={defaultPublication.link}
          />

          <HorizontalFields>
            <FormTextField
              required
              control={control}
              name="autor_first_name"
              label="Autor - Primeiro Nome"
              errors={errors.autor_first_name}
              defaultValue={defaultPublication.autor_first_name}
              margin_type="no-margin"
            />

            <FormTextField
              required
              control={control}
              name="autor_last_name"
              label="Autor - Sobrenome"
              errors={errors.autor_last_name}
              defaultValue={defaultPublication.autor_last_name}
              margin_type="left-margin"
            />
          </HorizontalFields>

          <HorizontalFields>
            <FormTextField
              control={control}
              name="orientador_first_name"
              label="Orientador"
              errors={errors.orientador_first_name}
              defaultValue={defaultPublication.orientador_first_name}
              margin_type="no-margin"
            />

            <FormTextField
              control={control}
              name="orientador_last_name"
              label="Orientador"
              errors={errors.orientador_last_name}
              defaultValue={defaultPublication.orientador_last_name}
              margin_type="left-margin"
            />
          </HorizontalFields>

          <FormAutoComplete
            multiple
            freeSolo
            control={control}
            name="palavras_chave"
            label="Palavras Chaves"
            options={[]}
            errors={errors.palavras_chave}
            defaultValue={defaultPublication.palavras_chave}
          />

          <FormAutoComplete
            required
            freeSolo
            control={control}
            name="programa"
            label="Programa"
            options={filterData?.programa || null}
            errors={errors.programa}
            defaultValue={defaultPublication.programa}
          />

          <FormAutoComplete
            required
            freeSolo
            control={control}
            name="campo"
            label="Campo"
            options={filterData?.campo || null}
            errors={errors.campo}
            defaultValue={defaultPublication.campo}
          />

          <FormAutoComplete
            required
            freeSolo
            control={control}
            name="instituicao"
            label="Instituição"
            options={filterData?.instituicao || null}
            errors={errors.instituicao}
            defaultValue={defaultPublication.instituicao}
          />

          <FormAutoComplete
            required
            freeSolo
            control={control}
            name="tipo_instituicao"
            label="Tipo de Instituição"
            options={filterData?.tipo_instituicao || null}
            errors={errors.tipo_instituicao}
            defaultValue={defaultPublication.tipo_instituicao}
          />

          <FormAutoComplete
            required
            freeSolo
            control={control}
            name="estado"
            label="Estado"
            options={filterData?.estado || null}
            errors={errors.estado}
            defaultValue={defaultPublication.estado}
          />

          <Button type="submit" variant="contained">
            Salvar Alterações
          </Button>

          <Button className="cancel" variant="contained" onClick={() => closeModal()}>
            Cancelar
          </Button>
        </form>
      </PublicationForm>
    </Dialog>
  );
}
