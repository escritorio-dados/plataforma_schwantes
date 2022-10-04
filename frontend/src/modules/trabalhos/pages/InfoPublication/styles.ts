import styled from '@emotion/styled';

export const Publication = styled.div`
  text-align: justify;

  margin-top: 2rem;

  h2,
  h3,
  h4 {
    font-weight: bold;
  }

  h3,
  h4 {
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.7rem;
    color: #0d3362;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.3rem;
  }

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1rem;
  }

  .go-back {
    margin-bottom: 1rem;
  }

  main {
    > section {
      margin-top: 1rem;

      &.autor p {
        margin-left: 1rem;
      }

      &.palavras-chave > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 0.8rem;

        > span {
          border: 2px solid #0d3362;
          border-radius: 5px;
          padding: 0.3rem;
          display: block;
          white-space: nowrap;
          margin: 0.2rem;
          color: #737373;
        }
      }

      &.resumo p {
        margin-left: 1rem;
      }
    }
  }
`;

export const PublicationTags = styled.div`
  display: flex;
  align-items: center;

  > span {
    display: block;
    border-radius: 3px;
    padding: 2px 7px;
    font-size: 1rem;
    color: #fff;

    &.ano {
      background-color: #df5a35;
    }

    &.tipo {
      background-color: #9f9e9e;
    }

    & + span {
      margin-left: 0.5rem;
    }
  }
`;

export const MetadataInfo = styled.div`
  margin-left: 1rem;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 2rem;
  }

  p.metadata {
    font-weight: bold;
    width: 40%;
  }

  p.info {
  }
`;
