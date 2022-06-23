import { Box, Grid, Typography } from '@mui/material';

import arrow from '#static/about/arrow.svg';
import bio1 from '#static/bio/bio_1.png';
import bio2 from '#static/bio/bio_2.png';
import bio3 from '#static/bio/bio_3.png';
import bio4 from '#static/bio/bio_4.png';
import bio5 from '#static/bio/bio_5.png';

import { BioInfoContainer, Divider, Image, ImagesContainer, NavLink, Paragraph } from './styles';

export function BioInfo() {
  return (
    <BioInfoContainer id="bio">
      <Box className="background" />

      <Grid container spacing={12}>
        <Grid item xs={12} sm={6} lg={5} xl={4}>
          <Divider />

          <Typography sx={{ color: '#737373', fontWeight: 'bold', marginTop: '2rem' }}>
            Biografia
          </Typography>

          <Typography
            sx={{ color: '#737373', fontWeight: 'bold', marginTop: '1rem', fontSize: '35px' }}
          >
            Siegfried Júlio Schwantes
          </Typography>

          <Paragraph>
            O pastor e professor Siegfried Júlio Schwantes, em homenagem a quem esta plataforma foi
            nomeada, teve sua vida marcada pela dedicação à academia, licenciatura e escrita.
          </Paragraph>

          <NavLink to="/bio">
            Saber mais <img src={arrow} alt="Seta" />
          </NavLink>
        </Grid>

        <Grid item xs={12} sm={6} lg={7} xl={8}>
          <ImagesContainer>
            <Image>
              <img src={bio1} alt="Bio 1" />
            </Image>

            <Image>
              <img src={bio2} alt="Bio 2" />
            </Image>

            <Image>
              <img src={bio3} alt="Bio 3" />
            </Image>

            <Image>
              <img src={bio4} alt="Bio 4" />
            </Image>

            <Image>
              <img src={bio5} alt="Bio 5" />
            </Image>
          </ImagesContainer>
        </Grid>
      </Grid>
    </BioInfoContainer>
  );
}
