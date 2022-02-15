import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { FormTextField } from '#shared/components/form/FormTextField';
import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { usePost } from '#shared/services/useAxios';
import { IUser, ICreateUserInput } from '#shared/types/backend/IUser';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { ICreateUserSchema, createUserSchema } from '#modules/users/schemas/createUser.schema';

import { UserForm } from './styles';

type ICreateUserModal = {
  openModal: boolean;
  closeModal: () => void;
  handleAdd(data: IUser): void;
};

export function CreateUserModal({ closeModal, openModal, handleAdd }: ICreateUserModal) {
  const { toast } = useToast();

  const { loading: createLoading, send: createUser } = usePost<IUser, ICreateUserInput>(`/users`);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUserSchema>({
    resolver: yupResolver(createUserSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const handleCreate = useCallback(
    async (input: ICreateUserSchema) => {
      removeEmptyFields(input);

      const { error, data } = await createUser(input);

      if (error) {
        toast({ message: error, severity: 'error' });

        return;
      }

      if (data) {
        toast({ message: 'usuario cadastrado', severity: 'success' });

        handleAdd(data);
      }

      closeModal();
    },
    [closeModal, handleAdd, toast, createUser],
  );

  return (
    <Dialog open={openModal} maxWidth="md" fullWidth onClose={closeModal}>
      <Loading loading={createLoading} />

      <UserForm elevation={3}>
        <Typography component="h2">Cadastrar Usuario</Typography>

        <form onSubmit={handleSubmit(handleCreate)} noValidate>
          <FormTextField
            required
            autoComplete="new-password"
            control={control}
            name="email"
            label="Email"
            margin_type="no-margin"
            errors={errors.email}
          />

          <FormTextField
            required
            autoComplete="new-password"
            type="password"
            control={control}
            name="password"
            label="Senha"
            errors={errors.password}
          />

          <FormTextField
            required
            autoComplete="new-password"
            type="password"
            control={control}
            name="confirmPassword"
            label="Confirmar Senha"
            errors={errors.confirmPassword}
            helperText="Repetir a senha digitada"
          />

          <Button type="submit" variant="contained">
            Cadastrar usuario
          </Button>

          <Button className="cancel" variant="contained" onClick={() => closeModal()}>
            Cancelar
          </Button>
        </form>
      </UserForm>
    </Dialog>
  );
}
