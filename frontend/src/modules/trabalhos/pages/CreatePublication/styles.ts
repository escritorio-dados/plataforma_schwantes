import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { grey } from '@mui/material/colors';

export const PublicationForm = styled(Paper)`
  max-width: 1200px;
  margin: auto;

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

      &.cancel {
        background-color: ${grey[500]};

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`;

export const HorizontalFields = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
`;
