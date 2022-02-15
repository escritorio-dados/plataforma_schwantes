import styled from '@emotion/styled';
import { blue } from '@mui/material/colors';

export const ListUsersContainer = styled.div`
  max-width: 1200px;
  margin: auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    border-radius: 5px 5px 0 0;

    background-color: ${blue[600]};

    > h2 {
      color: #eee;
      font-size: 1.3rem;
      margin-left: 1rem;
    }
  }

  main {
    thead {
      th {
        font-size: 1rem;
      }
    }
  }
`;
