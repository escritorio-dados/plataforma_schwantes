import { Box, Container, Grid, Typography } from '@mui/material';

import apoio from '#static/footer/apoio.png';
import unasp from '#static/footer/unasp.png';
import unaspress from '#static/footer/unaspress.png';
// import criadores2 from '#static/footer/criadores2.png';

import { FooterContainer, LinkText } from './styles';

export function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <Box>
          <Grid container spacing={6}>
            <Grid item xs={4}>
              <Typography sx={{ color: '#E74242', fontSize: 13 }}>
                Engenheiro Coelho - SP
              </Typography>

              <Typography fontSize="12px" sx={{ marginTop: '0.5rem', lineHeight: 1.7 }}>
                Estrada Municipal Pastor Walter Boger, S/N - Lagoa Bonita, Eng. Coelho - SP,
                13448-900
                <br />
                <b>Atendimento</b>: 0800 948 0048
                <br />
                <b>E-mail</b>: atendimento.ec@unasp.edu.br
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ color: '#E74242', fontSize: 13 }}>PROPEDI</Typography>

              <Typography fontSize="12px" sx={{ marginTop: '0.5rem', lineHeight: 1.7 }}>
                <b>Link</b>:{' '}
                <LinkText href="https://www.unasp.br/ciencia" target="_blank">
                  https://www.unasp.br/ciencia
                </LinkText>
                <br />
                <b>Atendimento</b>: 3858-5150
                <br />
                <b>E-mail</b>: escritorio.pesquisa@unasp.edu.br
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ color: '#E74242', fontSize: 13 }}>EDM</Typography>

              <Typography fontSize="12px" sx={{ marginTop: '0.5rem', lineHeight: 1.7 }}>
                <b>Atendimento</b>: 3858-5171
                <br />
                <b>E-mail</b>: escritorio.dados@unasp.edu.br
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: '1rem' }}>
          <Typography sx={{ color: '#E74242', fontSize: 13 }}>Criadores:</Typography>

          <Box display="flex" sx={{ padding: '0.5rem 0', alignItems: 'center' }}>
            <img src={unaspress} alt="Unaspress" width="200px" />

            <img src={unasp} alt="Unasp" width="200px" style={{ marginLeft: '3rem' }} />
          </Box>
        </Box>

        <Box sx={{ marginTop: '1rem' }}>
          <Typography sx={{ color: '#E74242', fontSize: 13 }}>Apoio:</Typography>

          <Box sx={{ padding: '1rem 0' }}>
            <img src={apoio} alt="Apoio" width="470px" />
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
}
