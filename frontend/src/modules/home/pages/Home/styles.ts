import { Box, styled } from '@mui/material';

export const BackgroundImage = styled('img')`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
`;

export const BackgroundDiv = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;

  height: 730px;

  background: linear-gradient(168.91deg, #252c49 35.76%, #232f5e 81.09%);
  border-radius: 0 0 70px 0;
`;
