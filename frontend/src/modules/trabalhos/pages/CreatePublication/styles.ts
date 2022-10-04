import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const PublicationForm = styled(Paper)`
  padding: 1rem;

  > h2 {
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }

  form {
    > button {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;

export const HorizontalFields = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
`;
