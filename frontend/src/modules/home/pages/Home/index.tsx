import { Box } from '@mui/material';

import { ContainerStyled } from '#shared/styles/container';

import { About } from '#modules/home/components/About';
import { BioInfo } from '#modules/home/components/BioInfo';
import { Expediente } from '#modules/home/components/Expediente';
import { SearchDestaque } from '#modules/home/components/SearchDestaque';

export function Home() {
  return (
    <Box overflow="auto">
      <SearchDestaque />

      <ContainerStyled maxWidth="xl">
        <About />
      </ContainerStyled>

      <BioInfo />

      <ContainerStyled maxWidth="xl">
        <Expediente />
      </ContainerStyled>
    </Box>
  );
}
