import { Box } from '@mui/material';

import bgImage from '#static/back_home.svg';

import { Navbar } from '#shared/components/Navbar';

import { About } from '#modules/home/components/About';
import { BioInfo } from '#modules/home/components/BioInfo';
import { Expediente } from '#modules/home/components/Expediente';
import { SearchDestaque } from '#modules/home/components/SearchDestaque';

import { BackgroundImage } from './styles';

export function Home() {
  return (
    <Box overflow="auto">
      <BackgroundImage
        src={bgImage}
        alt="background"
        sx={{
          width: { xl: '60%', lg: '80%', md: '90%', sm: '100%', xs: '100%' },
        }}
      />

      <Navbar />

      <SearchDestaque />

      <About />

      <BioInfo />

      <Expediente />
    </Box>
  );
}
