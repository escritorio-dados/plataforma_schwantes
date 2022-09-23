import { Box, styled, Typography } from '@mui/material';
import { HashLink } from 'react-router-hash-link';

export const Divider = styled(Box)`
  width: 10%;
  height: 5px;
  background: #e74040;
  margin-top: 1rem;
`;

export const Paragraph = styled(Typography)`
  margin-top: 1rem;
  text-align: justify;
  color: #737373;
  font-size: 14px;
`;

export const LinkText = styled('a')`
  text-decoration: none;
  color: #737373;
  font-weight: bold;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }
`;

export const NavLinkHash = styled(HashLink)`
  text-decoration: none;
  color: #737373;
  font-weight: bold;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }
`;
