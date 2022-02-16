import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { grey } from '@mui/material/colors';

export const Container = styled(Paper)`
  height: 400px;
  max-width: 600px;

  margin: auto;
  margin-top: calc(50vh - 200px - 64px - 4rem);
  padding: 2rem;

  display: flex;
  align-items: center;
  position: relative;

  form {
    width: 100%;

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
