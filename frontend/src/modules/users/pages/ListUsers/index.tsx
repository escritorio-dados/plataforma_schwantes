import { AddCircleOutlineOutlined, Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { useCallback, useEffect, useState } from 'react';

import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { ContainerStyled } from '#shared/styles/container';
import { DEFAULT_USER_ID, IUser } from '#shared/types/backend/IUser';

import { CreateUserModal } from '#modules/users/components/CreateUser';
import { DeleteUserModal } from '#modules/users/components/DeleteUser';
import { UpdateUserModal } from '#modules/users/components/UpdateUser';

import { ListUsersContainer } from './styles';

type IDeleteModal = { id: string; email: string } | null;

export function ListUsers() {
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<IDeleteModal>(null);

  const { toast } = useToast();

  const { error, loading, data, updateData } = useGet<IUser[]>({ url: '/users' });

  useEffect(() => {
    if (error) {
      toast({ message: error, severity: 'error' });
    }
  }, [error, toast]);

  const handleChange = useCallback(
    (newData: IUser) => {
      updateData((current) => {
        if (!current) {
          return current;
        }

        return current.map((user) => {
          if (user.id === newData.id) {
            return { ...user, ...newData };
          }

          return user;
        });
      });
    },
    [updateData],
  );

  const handleCreate = useCallback(
    (newData: IUser) => {
      updateData((current) => {
        if (!current) {
          return current;
        }

        return [...current, newData];
      });
    },
    [updateData],
  );

  const handleDelete = useCallback(
    (id: string) => {
      updateData((current) => {
        if (!current) {
          return current;
        }

        return current.filter((user) => user.id !== id);
      });
    },
    [updateData],
  );

  if (loading) return <Loading loading={loading} />;

  return (
    <>
      {!!updateModal && (
        <UpdateUserModal
          user_id={updateModal}
          closeModal={() => setUpdateModal(null)}
          handleChange={handleChange}
          openModal={!!updateModal}
        />
      )}

      {!!deleteModal && (
        <DeleteUserModal
          user={deleteModal}
          closeModal={() => setDeleteModal(null)}
          handleRemove={handleDelete}
          openModal={!!deleteModal}
        />
      )}

      {createModal && (
        <CreateUserModal
          closeModal={() => setCreateModal(false)}
          handleAdd={handleCreate}
          openModal={createModal}
        />
      )}

      <ContainerStyled maxWidth="lg">
        <ListUsersContainer>
          <header>
            <Typography component="h2">Lista de de usuarios</Typography>

            <Tooltip title="Cadastrar">
              <IconButton onClick={() => setCreateModal(true)}>
                <AddCircleOutlineOutlined sx={{ color: '#fff' }} fontSize="large" />
              </IconButton>
            </Tooltip>
          </header>

          {data && (
            <main>
              <TableContainer component={Paper} elevation={3}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.id !== DEFAULT_USER_ID && (
                            <>
                              <Tooltip title="Editar">
                                <IconButton onClick={() => setUpdateModal(user.id)}>
                                  <Edit sx={{ color: blue[500] }} fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Deletar">
                                <IconButton
                                  onClick={() => setDeleteModal({ id: user.id, email: user.email })}
                                >
                                  <Delete sx={{ color: red[500] }} fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </main>
          )}
        </ListUsersContainer>
      </ContainerStyled>
    </>
  );
}
