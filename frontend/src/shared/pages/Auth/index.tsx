import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { FormTextField } from '#shared/components/form/FormTextField';
import { useAuth } from '#shared/hooks/auth';
import { ContainerStyled } from '#shared/styles/container';

import { AuthContainer } from './styles';

const authSchema = yup.object({
  email: yup.string().email('Deve ser um e-mail').required('O e-mail é obrigatório'),
  password: yup.string().required('A senha é obrigatória'),
});

type IAuthSchema = { email: string; password: string };

export function Auth() {
  const { signIn, logged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      navigate(-1);
    }
  }, [logged, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthSchema>({
    resolver: yupResolver(authSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  return (
    <ContainerStyled maxWidth="lg">
      <AuthContainer elevation={5}>
        <form onSubmit={handleSubmit(signIn)} noValidate>
          <FormTextField
            required
            control={control}
            name="email"
            label="E-mail"
            margin_type="no-margin"
            errors={errors.email}
          />

          <FormTextField
            required
            control={control}
            type="password"
            name="password"
            label="Senha"
            errors={errors.password}
          />

          <Button sx={{ marginTop: '1rem' }} fullWidth type="submit" variant="contained">
            Entrar
          </Button>
        </form>
      </AuthContainer>
    </ContainerStyled>
  );
}
