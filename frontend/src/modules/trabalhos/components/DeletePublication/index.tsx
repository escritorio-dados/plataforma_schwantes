import { Dialog, Typography } from '@mui/material';
import { useCallback } from 'react';

import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { useDelete } from '#shared/services/useAxios';
import { CustomButtom } from '#shared/styles/common';
import { IPublication } from '#shared/types/backend/IPublication';

import { DeleteContainer } from './styles';

type IDeletePublicationModal = {
  openModal: boolean;
  closeModal: () => void;
  publication: { id: string; titulo: string };
  handleDeletion(id: string): void;
};

export function DeletePublicationModal({
  closeModal,
  publication,
  openModal,
  handleDeletion,
}: IDeletePublicationModal) {
  const { toast } = useToast();

  const { send, loading } = useDelete<IPublication>(`/elastic/doc/${publication.id}`);

  const handleDelete = useCallback(async () => {
    const { error } = await send();

    if (error) {
      toast({ message: error, severity: 'error' });

      return;
    }

    toast({ message: 'publicação excluida', severity: 'success' });

    handleDeletion(publication.id);

    closeModal();
  }, [send, toast, handleDeletion, publication.id, closeModal]);

  return (
    <>
      <Loading loading={loading} />

      <Dialog open={openModal} onClose={closeModal} fullWidth maxWidth="sm">
        <DeleteContainer>
          <Typography component="h2">Deletar Publicação</Typography>

          <Typography>Tem certeza que deseja deletar a publicação: </Typography>

          <Typography className="item">{publication.titulo}</Typography>

          <CustomButtom className="delete" onClick={handleDelete} variant="contained" fullWidth>
            Sim
          </CustomButtom>

          <CustomButtom
            className="cancel"
            onClick={closeModal}
            variant="contained"
            fullWidth
            customColor="#0d3362"
          >
            Não
          </CustomButtom>
        </DeleteContainer>
      </Dialog>
    </>
  );
}
