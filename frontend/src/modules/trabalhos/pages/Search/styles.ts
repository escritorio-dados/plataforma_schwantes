import styled from '@emotion/styled';
import { Accordion, AccordionSummary } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';

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
  margin-bottom: 2em;

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
        padding: 0.2em 0.6em;
        background-color: ${grey[300]};
        border-radius: 5px;
        margin-right: 0.5em;
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
      margin-right: 2em;
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
    min-height: 3em;

    border-radius: 5px 5px 0 0;
  }
`;

export const FilterContent = styled.div`
  display: flex;
  flex-direction: column;

  > button {
    width: 100%;
    margin-top: 1em;
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
    align-items: center;

    margin-top: 1em;
  }
`;

export const ResponsiveContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 899px) {
    > div.filter {
      margin-bottom: 2em;
    }
  }

  @media (min-width: 900px) {
    flex-direction: row;

    > div.filter {
      width: 34%;
      margin-right: 2em;
      min-width: 300px;
    }

    > div.content {
      width: 66%;
    }
  }
`;
