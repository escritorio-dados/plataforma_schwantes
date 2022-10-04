import { Box, styled } from '@mui/material';
import { HashLink } from 'react-router-hash-link';

export const Logo = styled('img')`
  margin-right: 2rem;
`;

export const TopBar = styled(Box)`
  display: flex;
  align-items: center;

  padding: 1rem;
`;

export const NavBar = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;

  height: 3.5rem;
  padding: 0 1rem;
`;

export const NavLink = styled(HashLink)`
  text-decoration: none;

  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 0.75rem;
  color: #fff;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

  & + a {
    margin-left: 2.5rem;
  }

  &.login {
    margin-left: auto;
  }
`;

export const AuthSm = styled(HashLink)`
  text-decoration: none;

  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 0.75rem;
  color: #fff;
`;

export const NavLinkSm = styled(HashLink)`
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 0.75rem;
  color: #333;

  padding: 8px 16px;
`;
