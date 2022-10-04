import { styled, Button } from '@mui/material';

type ICustomButtom = { customColor?: string };

export const CustomButtom = styled(Button)<ICustomButtom>`
  background-color: ${(props) => props.customColor || '#df5a35'};

  transition: filter 0.2s;

  &:hover {
    background-color: ${(props) => props.customColor || '#df5a35'};
    filter: brightness(0.9);
  }
`;
