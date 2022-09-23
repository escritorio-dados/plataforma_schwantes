import { Box, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const AboutContainer = styled(Box)`
  margin-top: 10rem;
`;

export const Paragraph = styled(Typography)`
  margin-top: 1rem;
  text-align: justify;
  color: #737373;
`;

export const Divider = styled(Box)`
  width: 30%;
  height: 2px;
  background: #e74040;
  margin-top: 1rem;
`;

export const OpenLink = styled('a')`
  display: flex;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 0.75rem;

  margin-top: 1.5rem;

  color: #23a6f0;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }

  > img {
    margin-left: 0.4rem;
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 0.75rem;

  margin-top: 1.5rem;

  color: #23a6f0;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }

  > img {
    margin-left: 0.4rem;
  }
`;
