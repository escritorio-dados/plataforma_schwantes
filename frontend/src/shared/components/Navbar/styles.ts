import { Box, styled } from '@mui/material';
import { HashLink } from 'react-router-hash-link';

export const Logo = styled('img')``;

export const TopBar = styled(Box)`
  display: flex;
  align-items: center;

  padding: 1rem;
`;

export const NavBar = styled(Box)`
  display: flex;
  align-items: center;
  border-radius: 10px;
  width: 100%;

  background-color: #fff;

  height: 3.5rem;
  padding: 0 1rem;
`;

export const NavLink = styled(HashLink)`
  text-decoration: none;

  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 0.75rem;
  color: #252b42;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;

  &:hover {
    border-bottom: 2px solid #252b42;
    border-radius: 0 0 3px 3px;
  }

  & + a {
    margin-left: 2.5rem;
  }

  &.login {
    margin-left: auto;
  }
`;
