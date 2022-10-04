import { Dialog, Typography } from '@mui/material';
import { useCallback } from 'react';

import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { useDelete } from '#shared/services/useAxios';
import { CustomButtom } from '#shared/styles/common';
import { IUser } from '#shared/types/backend/IUser';

import { DeleteContainer } from './styles';

type IDeleteUserModal = {
  openModal: boolean;
  closeModal: () => void;
  user: { id: string; email: string };
  handleRemove(id: string): void;
};

export function DeleteUserModal({ closeModal, user, openModal, handleRemove }: IDeleteUserModal) {
  const { toast } = useToast();

  const { send, loading } = useDelete<IUser>(`/users/${user.id}`);

  const handleDelete = useCallback(async () => {
    const { error } = await send();

    if (error) {
      toast({ message: error, severity: 'error' });

      return;
    }

    toast({ message: 'usuario excluido', severity: 'success' });

    handleRemove(user.id);

    closeModal();
  }, [send, toast, handleRemove, user.id, closeModal]);

  return (
    <>
      <Loading loading={loading} />

      <Dialog open={openModal} onClose={closeModal} fullWidth maxWidth="sm">
        <DeleteContainer>
          <Typography component="h2">Deletar Usuario</Typography>

          <Typography>Tem certeza que deseja excluir o usuario: </Typography>

          <Typography className="item">{user.email}</Typography>

          <CustomButtom onClick={handleDelete} variant="contained" fullWidth>
            Sim
          </CustomButtom>

          <CustomButtom onClick={closeModal} variant="contained" fullWidth customColor="#0d3362">
            Não
          </CustomButtom>
        </DeleteContainer>
      </Dialog>
    </>
  );
}
