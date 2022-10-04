import { Box, styled } from '@mui/material';

export const FooterContainer = styled('footer')`
  min-height: 4rem;
  width: 100%;
  margin-top: auto;

  background-color: #0e395e;
  color: #fff;
  padding: 1rem;

  p span {
    color: #fff;
  }
`;

export const LinkText = styled('a')`
  text-decoration: none;
  color: #fff;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }
`;

export const Divider = styled(Box)`
  height: 2px;
  background-color: #145c85;
  width: 100%;
  margin: 3rem 0;
`;
