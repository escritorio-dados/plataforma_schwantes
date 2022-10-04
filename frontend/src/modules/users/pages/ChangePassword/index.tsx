import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormTextField } from '#shared/components/form/FormTextField';
import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { usePatch } from '#shared/services/useAxios';
import { CustomButtom } from '#shared/styles/common';
import { ContainerStyled } from '#shared/styles/container';
import { IChangePasswordInput, IUser } from '#shared/types/backend/IUser';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import {
  changePasswordSchema,
  IChangePasswordSchema,
} from '#modules/users/schemas/changePassword.schema';

import { Container } from './styles';

export function ChangePassword() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { loading: updateLoading, send: updateUser } = usePatch<IUser, IChangePasswordInput>(
    `/users/me/password`,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const handleUpdate = useCallback(
    async (input: IChangePasswordSchema) => {
      removeEmptyFields(input);

      const { error, data } = await updateUser(input);

      if (error) {
        toast({ message: error, severity: 'error' });

        return;
      }

      if (data) {
        toast({ message: 'senha atualizada', severity: 'success' });

        navigate('/');
      }
    },
    [navigate, toast, updateUser],
  );

  return (
    <>
      <Loading loading={updateLoading} />

      <ContainerStyled maxWidth="lg">
        <Container elevation={3}>
          <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <FormTextField
              required
              type="password"
              control={control}
              name="oldPassword"
              label="Senha Atual"
              margin_type="no-margin"
              errors={errors.oldPassword}
            />

            <FormTextField
              required
              type="password"
              control={control}
              name="newPassword"
              label="Nova Senha"
              errors={errors.newPassword}
            />

            <FormTextField
              required
              type="password"
              control={control}
              name="confirmPassword"
              label="Confirmar Nova Senha"
              errors={errors.confirmPassword}
            />

            <CustomButtom fullWidth type="submit" variant="contained">
              Alterar a senha
            </CustomButtom>

            <CustomButtom variant="contained" onClick={() => navigate('/')} customColor="#0d3362">
              Cancelar
            </CustomButtom>
          </form>
        </Container>
      </ContainerStyled>
    </>
  );
}
