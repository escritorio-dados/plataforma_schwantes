import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const Container = styled(Paper)`
  height: 400px;
  max-width: 600px;

  margin: auto;
  margin-top: 2rem;
  padding: 2rem;

  display: flex;
  align-items: center;
  position: relative;

  form {
    width: 100%;

    > button {
      width: 100%;

      margin-top: 1rem;
    }
  }
`;
