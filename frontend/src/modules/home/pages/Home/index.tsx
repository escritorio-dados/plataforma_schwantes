import { Box } from '@mui/material';

import back2 from '#static/back2.png';

import { Navbar } from '#shared/components/Navbar';
import { ContainerStyled } from '#shared/styles/container';

import { About } from '#modules/home/components/About';
import { BioInfo } from '#modules/home/components/BioInfo';
import { Expediente } from '#modules/home/components/Expediente';
import { SearchDestaque } from '#modules/home/components/SearchDestaque';

import { BackgroundDiv, BackgroundImage } from './styles';

export function Home() {
  return (
    <Box overflow="auto">
      {/* <Box sx={{ position: 'relative', maxWidth: '2000px' }} /> */}
      <BackgroundImage
        src={back2}
        alt="Back"
        sx={{
          width: { xl: '60%', lg: '70%', md: '90%' },
          height: '650px',
          display: { xs: 'none', md: 'block' },
          top: '-1px',
        }}
      />

      <BackgroundDiv
        sx={{
          display: { xs: 'block', md: 'none' },
          height: { xs: '730px' },
        }}
      />

      <ContainerStyled maxWidth="xl">
        <Navbar />

        <SearchDestaque />

        <About />
      </ContainerStyled>

      <BioInfo />

      <ContainerStyled maxWidth="xl">
        <Expediente />
      </ContainerStyled>
    </Box>
  );
}
