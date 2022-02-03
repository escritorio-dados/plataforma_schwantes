import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';

export const LogoStyled = styled.img`
  width: 10em;
  display: flex;
`;

export const MenuLinkButton = styled(Button)`
  display: block;
  color: #fff;

  transition: border-bottom 0.3s;

  &:hover {
    color: ${green[200]};
    border-bottom: 1px solid #fff;
  }
`;

export const LoginButton = styled(Button)`
  color: #fff;
  background-color: ${green[400]};
  transition: filter 0.2s;

  &:hover {
    background-color: ${green[400]};
    filter: brightness(0.9);
  }
`;
