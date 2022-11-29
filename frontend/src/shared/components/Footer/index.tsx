import { Box, Container, Grid, Typography } from '@mui/material';

import apoio from '#static/footer/apoio.png';
import unasp from '#static/footer/unasp.png';
import unaspress from '#static/footer/unaspress.png';

import { Divider, FooterContainer, LinkText } from './styles';

export function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <Divider />

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ color: '#fc714c', fontSize: 13 }}>
                Engenheiro Coelho - SP
              </Typography>

              <Typography fontSize="12px" sx={{ marginTop: '0.5rem', lineHeight: 1.7 }}>
                Estrada Municipal Pastor Walter Boger, S/N - Lagoa Bonita, Eng. Coelho - SP,
                13448-900
                <br />
                <b>Atendimento</b>: <span>0800 948 0048</span>
                <br />
                <b>E-mail</b>: <span>atendimento.ec@unasp.edu.br</span>
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ color: '#fc714c', fontSize: 13 }}>
                Pró-reitoria de Pesquisa e Desenvolvimento Institucional
              </Typography>

              <Typography fontSize="12px" sx={{ marginTop: '0.5rem', lineHeight: 1.7 }}>
                <b>Link</b>:{' '}
                <LinkText href="https://www.unasp.br/ciencia" target="_blank">
                  https://www.unasp.br/ciencia
                </LinkText>
                <br />
                <b>Atendimento</b>: <span>3858-5150</span>
                <br />
                <b>E-mail</b>: <span>escritorio.pesquisa@unasp.edu.br</span>
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ color: '#fc714c', fontSize: 13 }}>
                Escritório de Apoio a Gestão de Dados e Métricas
              </Typography>

              <Typography fontSize="12px" sx={{ marginTop: '0.5rem', lineHeight: 1.7 }}>
                <b>Atendimento</b>: <span>3858-5171</span>
                <br />
                <b>E-mail</b>: <span>escritorio.dados@unasp.edu.br</span>
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography sx={{ color: '#fc714c', fontSize: 13 }}>Realização:</Typography>

              <Box sx={{ padding: '0.5rem 0' }}>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={unaspress}
                      alt="Unaspress"
                      style={{ maxWidth: '200px', width: '100%' }}
                    />
                  </Grid>

                  <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={unasp} alt="Unasp" style={{ maxWidth: '200px', width: '100%' }} />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography sx={{ color: '#fc714c', fontSize: 13 }}>Apoio:</Typography>

              <Box sx={{ padding: '1rem 0' }}>
                <img src={apoio} alt="Apoio" style={{ maxWidth: '470px', width: '100%' }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
}
