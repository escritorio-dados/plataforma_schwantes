import styled from '@emotion/styled';

export const DeleteContainer = styled.div`
  padding: 1rem;

  > h2 {
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }

  > p.item {
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 1rem;
  }

  > button {
    margin-top: 1rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
