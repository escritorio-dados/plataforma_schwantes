import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormTextField } from '#shared/components/form/FormTextField';
import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { useGet, usePut } from '#shared/services/useAxios';
import { CustomButtom } from '#shared/styles/common';
import { IUser, IUpdateUserInput } from '#shared/types/backend/IUser';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IUpdateUserSchema, updateUserSchema } from '#modules/users/schemas/updateUser.schema';

import { UserForm } from './styles';

type IUpdateUserModal = {
  openModal: boolean;
  closeModal: () => void;
  user_id: string;
  handleChange(data: IUser): void;
};

export function UpdateUserModal({
  closeModal,
  user_id,
  openModal,
  handleChange,
}: IUpdateUserModal) {
  const { toast } = useToast();

  const {
    error: userError,
    loading: userLoading,
    data: user,
  } = useGet<IUser>({ url: `/users/${user_id}` });

  const { loading: updateLoading, send: updateUser } = usePut<IUser, IUpdateUserInput>(
    `/users/${user_id}`,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUserSchema>({
    resolver: yupResolver(updateUserSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (userError) {
      toast({ message: userError, severity: 'error' });

      closeModal();
    }
  }, [userError, toast, closeModal]);

  const handleUpdate = useCallback(
    async (input: IUpdateUserSchema) => {
      removeEmptyFields(input);

      const { error, data } = await updateUser(input);

      if (error) {
        toast({ message: error, severity: 'error' });

        return;
      }

      if (data) {
        toast({ message: 'usuario atualizada', severity: 'success' });

        handleChange(data);
      }

      closeModal();
    },
    [closeModal, handleChange, toast, updateUser],
  );

  if (userLoading) return <Loading loading={userLoading} />;

  return (
    <Dialog open={openModal} maxWidth="md" fullWidth onClose={closeModal}>
      <Loading loading={updateLoading} />

      <UserForm elevation={3}>
        <Typography component="h2">Editar Usuario</Typography>

        <form onSubmit={handleSubmit(handleUpdate)} noValidate>
          <FormTextField
            required
            control={control}
            name="email"
            label="Email"
            margin_type="no-margin"
            errors={errors.email}
            defaultValue={user?.email}
          />

          <FormTextField
            type="password"
            control={control}
            name="password"
            label="Senha"
            errors={errors.password}
            helperText="Só Preecher se quiser mudar a senha"
          />

          <FormTextField
            type="password"
            control={control}
            name="confirmPassword"
            label="Confirmar Senha"
            errors={errors.confirmPassword}
            helperText="Só Preecher se quiser mudar a senha"
          />

          <CustomButtom type="submit" variant="contained">
            Salvar Alterações
          </CustomButtom>

          <CustomButtom variant="contained" onClick={() => closeModal()} customColor="#0d3362">
            Cancelar
          </CustomButtom>
        </form>
      </UserForm>
    </Dialog>
  );
}
