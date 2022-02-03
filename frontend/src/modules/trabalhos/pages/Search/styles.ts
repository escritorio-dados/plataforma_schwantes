import styled from '@emotion/styled';
import { blue, grey } from '@mui/material/colors';

export const Publication = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 2em;
  padding-bottom: 2em;

  .title {
    font-size: 1.3em;
    color: ${blue[700]};
    text-align: justify;
    font-weight: bold;
  }

  .autor {
    margin: 0.3em 0;
    color: ${blue[500]};
  }

  .resumo {
    text-align: justify;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const PublicationTags = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;

  > span {
    display: block;
    margin-right: 0.5em;
    border-radius: 3px;
    padding: 2px 7px;
    font-size: 0.8em;
    color: #fff;

    &.ano {
      background-color: ${blue[600]};
    }

    &.tipo {
      background-color: ${grey[600]};
    }
  }
`;

export const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;

  .total {
    display: flex;
    align-items: center;

    > span {
      display: block;
      padding: 0.2em 0.6em;
      background-color: ${grey[300]};
      border-radius: 5px;
      margin-right: 0.5em;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;
