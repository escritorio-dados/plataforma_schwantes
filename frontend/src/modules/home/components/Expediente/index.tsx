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
              isClickToPauseDisabled
              width="298px"
              height="250px"
              style={{ position: 'absolute', top: 0, left: 15 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ color: '#df5a35', fontSize: 14, fontWeight: 'bold' }}>
            Criação
          </Typography>

          <Typography sx={{ mt: '1rem', color: '#737373', lineHeight: 1.8 }}>
            Dr. Allan Novaes e Esp. Bruno Ferreira
          </Typography>

          <Typography sx={{ color: '#df5a35', fontSize: 14, fontWeight: 'bold', mt: '1rem' }}>
            Desenvolvimento
          </Typography>

          <Typography sx={{ mt: '1rem', color: '#737373', lineHeight: 1.8 }}>
            Dr. Rodrigo Follis, Bruna Short, Jamphier Geyser Carhuatanta Gomez, Thiago Ferreira
          </Typography>

          <Typography sx={{ color: '#df5a35', fontSize: 14, fontWeight: 'bold', mt: '1rem' }}>
            Suporte
          </Typography>

          <Typography sx={{ mt: '1rem', color: '#737373', lineHeight: 1.8 }}>
            Escritório de Apoio ao Pesquisador
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
