import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const AuthContainer = styled(Paper)`
  height: 300px;
  max-width: 600px;

  margin: auto;
  margin-top: calc(50vh - 150px - 64px);
  padding: 2rem;

  display: flex;
  align-items: center;
  position: relative;

  form {
    width: 100%;
  }
`;
