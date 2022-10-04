import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormAutoComplete } from '#shared/components/form/FormAutoComplete';
import { FormTextField } from '#shared/components/form/FormTextField';
import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { useGet, usePost } from '#shared/services/useAxios';
import { CustomButtom } from '#shared/styles/common';
import { ContainerStyled } from '#shared/styles/container';
import {
  IPublication,
  IPublicationInput,
  ISearchFilters,
} from '#shared/types/backend/IPublication';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IDocSchema, docSchema } from '#modules/trabalhos/schemas/doc.schema';

import { HorizontalFields, PublicationForm } from './styles';

export function CreatePublication() {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    error: filterErrors,
    loading: filterLoading,
    data: filterData,
  } = useGet<ISearchFilters>({ url: '/elastic/search/filters' });

  const { send: createPublication } = usePost<IPublication, IPublicationInput>(`/elastic/doc`);

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
    if (filterErrors) {
      toast({ message: filterErrors, severity: 'error' });
    }
  }, [filterErrors, toast]);

  const handleUpdate = useCallback(
    async (input: IDocSchema) => {
      removeEmptyFields(input);

      setLoading(true);

      const { error, data } = await createPublication({ ...input, ano: Number(input.ano) });

      if (error) {
        setLoading(false);

        toast({ message: error, severity: 'error' });

        return;
      }

      if (data) {
        await new Promise((r) => {
          setTimeout(r, 1000);
        });

        setLoading(false);

        toast({ message: 'publicação criada', severity: 'success' });

        navigate(`/?page=1&sort=score&search=${encodeURI(data.titulo)}`, { replace: true });
      }
    },
    [createPublication, toast, navigate],
  );

  if (filterLoading) return <Loading loading={filterLoading} />;

  return (
    <>
      <Loading loading={loading} />

      <ContainerStyled maxWidth="md" sx={{ mt: '2rem' }}>
        <PublicationForm elevation={3}>
          <Typography component="h2">Cadastrar Publicação</Typography>

          <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <FormTextField
              required
              control={control}
              name="titulo"
              label="Titulo"
              margin_type="no-margin"
              errors={errors.titulo}
            />

            <FormAutoComplete
              required
              freeSolo
              control={control}
              name="tipo_trabalho"
              label="Tipo de Trabalho"
              options={filterData?.tipo_trabalho || null}
              errors={errors.tipo_trabalho}
            />

            <FormTextField required control={control} name="ano" label="Ano" errors={errors.ano} />

            <FormTextField
              multiline
              control={control}
              name="resumo"
              label="Resumo"
              errors={errors.resumo}
            />

            <FormTextField control={control} name="link" label="Link" errors={errors.link} />

            <HorizontalFields>
              <FormTextField
                required
                control={control}
                name="autor_first_name"
                label="Autor - Primeiro Nome"
                errors={errors.autor_first_name}
                margin_type="no-margin"
              />

              <FormTextField
                required
                control={control}
                name="autor_last_name"
                label="Autor - Sobrenome"
                errors={errors.autor_last_name}
                margin_type="left-margin"
              />
            </HorizontalFields>

            <HorizontalFields>
              <FormTextField
                control={control}
                name="orientador_first_name"
                label="Orientador"
                errors={errors.orientador_first_name}
                margin_type="no-margin"
              />

              <FormTextField
                control={control}
                name="orientador_last_name"
                label="Orientador"
                errors={errors.orientador_last_name}
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
            />

            <FormAutoComplete
              required
              freeSolo
              control={control}
              name="programa"
              label="Programa"
              options={filterData?.programa || null}
              errors={errors.programa}
            />

            <FormAutoComplete
              required
              freeSolo
              control={control}
              name="campo"
              label="Campo"
              options={filterData?.campo || null}
              errors={errors.campo}
            />

            <FormAutoComplete
              required
              freeSolo
              control={control}
              name="instituicao"
              label="Instituição"
              options={filterData?.instituicao || null}
              errors={errors.instituicao}
            />

            <FormAutoComplete
              required
              freeSolo
              control={control}
              name="tipo_instituicao"
              label="Tipo de Instituição"
              options={filterData?.tipo_instituicao || null}
              errors={errors.tipo_instituicao}
            />

            <FormAutoComplete
              required
              freeSolo
              control={control}
              name="estado"
              label="Estado"
              options={filterData?.estado || null}
              errors={errors.estado}
            />

            <CustomButtom type="submit" variant="contained" customColor="#df5a35">
              Cadastrar Publicação
            </CustomButtom>

            <CustomButtom variant="contained" onClick={() => navigate(-1)} customColor="#0d3362">
              Cancelar
            </CustomButtom>
          </form>
        </PublicationForm>
      </ContainerStyled>
    </>
  );
}
