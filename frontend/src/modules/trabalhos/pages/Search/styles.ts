import styled from '@emotion/styled';
import { Accordion, AccordionSummary, Paper } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';

export const Publication = styled(Paper)`
  margin-bottom: 2rem;
  padding: 1rem;

  a {
    text-decoration: none;
  }

  .title {
    font-size: 1.3rem;
    color: ${blue[700]};
    text-align: justify;
    font-weight: bold;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.7);
    }
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
  margin-bottom: 0.5rem;

  > span {
    display: block;
    margin-right: 0.5rem;
    border-radius: 3px;
    padding: 2px 7px;
    font-size: 0.8rem;
    color: #fff;

    &.ano {
      background-color: ${blue[600]};
    }

    &.tipo {
      background-color: ${grey[600]};
    }
  }
`;

export const PublicationActions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  border-top: 1px solid #ccc;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
`;

export const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  > div.results {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .total {
      display: flex;
      align-items: center;

      > span {
        display: block;
        padding: 0.2em 0.6rem;
        background-color: ${grey[300]};
        border-radius: 5px;
        margin-right: 0.5rem;
      }
    }

    @media (min-width: 900px) {
      width: 66%;
    }
  }

  > div.filter-area {
    display: none;

    @media (min-width: 900px) {
      display: block;
      width: 34%;
      margin-right: 2rem;
      min-width: 300px;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const FilterContainer = styled(Accordion)`
  width: 100%;
`;

export const FilterTitle = styled(AccordionSummary)`
  background-color: ${blue[600]};
  color: #fff;

  text-align: center;

  border-radius: 5px;

  > div {
    display: flex;
    justify-content: center;

    &.Mui-expanded {
      margin: 0;
    }
  }

  &.Mui-expanded {
    min-height: 3rem;

    border-radius: 5px 5px 0 0;
  }
`;

export const FilterContent = styled.div`
  display: flex;
  flex-direction: column;

  > form {
    > button {
      width: 100%;
      margin-top: 1rem;
      align-self: center;
    }

    > button.clear {
      background-color: ${red[400]};
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.95);
      }
    }

    .ano {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      margin-top: 1rem;
    }
  }
`;

export const ResponsiveContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 899px) {
    > div.filter {
      margin-bottom: 2rem;
    }
  }

  @media (min-width: 900px) {
    flex-direction: row;

    > div.filter {
      width: 34%;
      margin-right: 2rem;
      min-width: 300px;
    }

    > div.content {
      width: 66%;
    }
  }
`;
