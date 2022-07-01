import { Box, Grid, Typography } from '@mui/material';
import LottieViwer from 'react-lottie';

import lapLottie from '#static/expediente/lap.json';
import laptop from '#static/expediente/laptop.png';

export function Expediente() {
  return (
    <Box sx={{ marginTop: '5rem' }} id="expediente">
      <Grid container spacing={5}>
        <Grid
          item
          md={6}
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '326px', height: '326px', position: 'relative', overflow: 'hidden' }}>
            <img src={laptop} alt="Laptop" width="100%" height="100%" />

            <LottieViwer
              options={{
                animationData: lapLottie,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              width="298px"
              height="250px"
              style={{ position: 'absolute', top: 0, left: 15 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ color: '#23A6F0', fontSize: 14, fontWeight: 'bold' }}>
            Expediente
          </Typography>

          <Typography
            sx={{ color: '#232F5E', fontSize: 27, fontWeight: 'bold', marginTop: '1rem' }}
          >
            Criadores da Plataforma
          </Typography>

          <Typography sx={{ marginTop: '1rem', color: '#737373', lineHeight: 1.8 }}>
            <b>Coordenação Geral</b>: Dr. Allan Novaes
            <br />
            <b>Coordenação técnica</b>: Esp. Bruno Ferreira
            <br />
            <b>Análise e Pesquisa</b>: Dr. Allan Novaes, Dr. Rodrigo Follis, Dra. Paula Caroline
            Passos , Jamphier Geyser Carhuatanta Gomez.
            <br />
            <b>Desenvolvimento técnico e suporte</b>: Thiago Ferreira
            <br />
            <b>Design das Telas</b>: Bruna Short
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
