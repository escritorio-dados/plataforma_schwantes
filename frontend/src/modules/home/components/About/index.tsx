import { Box, Grid, Typography } from '@mui/material';

import arrow from '#static/about/arrow.svg';
import graficoImg from '#static/about/graficos.png';
import icon1 from '#static/about/icon_1.svg';
import icon2 from '#static/about/icon_2.svg';
import icon3 from '#static/about/icon_3.svg';

import { AboutContainer, Divider, OpenLink, Paragraph } from './styles';

export function About() {
  return (
    <AboutContainer id="about">
      <Typography sx={{ color: '#23A6F0', fontSize: 14, fontWeight: 'bold' }}>Sobre</Typography>

      <Box sx={{ marginTop: '1rem' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ color: '#232F5E', fontSize: 27, fontWeight: 'bold' }}>
              A Plataforma
            </Typography>

            <Paragraph>
              A Igreja Adventista do Sétimo Dia (IASD) está presente no Brasil há mais de 150 anos e
              dentro do movimento protestante, ela é uma das maiores do país, acolhendo mais de 1
              milhão e meio de membros.
            </Paragraph>

            <Paragraph>
              A influência do adventismo vai muito além de suas igrejas, estendendo-se à área da
              saúde com sua rede de hospitais, comunicação com a rede Novo Tempo, literatura com a
              Casa Publicadora Brasileira (CPB), indústria alimentícia com a fábrica de alimentos
              saudáveis Superbom, e exerce também uma grandiosa influência no setor da educação com
              seus milhares de estudantes espalhados pelo Brasil em instituições que ofertam desde o
              ensino básico até o superior.
            </Paragraph>

            <Paragraph>
              Por sua presença marcante na sociedade brasileira, o adventismo torna-se
              frequentemente objeto de estudos nos programas de mestrado e doutorado em áreas
              diversas como ciências sociais aplicadas, ciências humanas, estudos de religião,
              teologia, saúde e outros.
            </Paragraph>

            <Paragraph>
              Como uma forma de facilitar a pesquisa sobre adventismo no Brasil e impulsionar a
              relevância desse nicho de pesquisa dentro do ambiente acadêmico, foi desenvolvido a
              Plataforma Shwantes, o primeiro repositório online, que fornece apoio à pesquisa e a
              formação de uma comunidade que compartilha trabalhos científicos com temas diversos
              voltados para o adventismo no Brasil.
            </Paragraph>

            {/* <NavLink to="/about">
              Saber mais <img src={arrow} alt="Seta" />
            </NavLink> */}
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={5}>
              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' },
                }}
              >
                <img src={icon1} alt="Apoio a pesquisa" />

                <Typography sx={{ color: '#232F5E', fontWeight: 'bold', marginTop: '0.5rem' }}>
                  Apoio à pesquisa
                </Typography>

                <Divider />

                <Paragraph>Visa incentivar a formação de pesquisadores brasileiros</Paragraph>
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' },
                }}
              >
                <img src={icon1} alt="Acervo" />

                <Typography sx={{ color: '#232F5E', fontWeight: 'bold', marginTop: '0.5rem' }}>
                  Acervo
                </Typography>

                <Divider />

                <Paragraph>
                  Dispõe de mais de 200 teses e dissertações defendidas em universidades brasileiras
                </Paragraph>
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' },
                }}
              >
                <img src={icon2} alt="Compartilhar" />

                <Typography sx={{ color: '#232F5E', fontWeight: 'bold', marginTop: '0.5rem' }}>
                  Compartilhar
                </Typography>

                <Divider />

                <Paragraph>
                  Dá a possibilidade do estudante compartilhar seus trabalhos científicos originais
                </Paragraph>
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' },
                }}
              >
                <img src={icon3} alt="Comunidade" />

                <Typography sx={{ color: '#232F5E', fontWeight: 'bold', marginTop: '0.5rem' }}>
                  Comunidade
                </Typography>

                <Divider />

                <Paragraph>
                  Comunidade que alimenta o nicho de pesquisa voltado para a religião no ambiente
                  acadêmico
                </Paragraph>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            md={6}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={graficoImg} alt="Compartilhar" width="100%" />
          </Grid>

          <Grid id="dados" item xs={12} md={6}>
            <Typography sx={{ color: '#23A6F0', fontSize: 14, fontWeight: 'bold' }}>
              Estatística
            </Typography>

            <Typography
              sx={{ color: '#232F5E', fontSize: 27, fontWeight: 'bold', marginTop: '1rem' }}
            >
              Dados do Acervo
            </Typography>

            <Paragraph>
              Através das análises de dados podemos ter informações atualizados da quantidade de
              acessos da plataforma, dos títulos produzidos por autores e orientadores, quantidade
              de artigos por área e instituições, além da quantidade de publicações por gênero e
              tipo de trabalho.
            </Paragraph>

            <Paragraph>
              Para acessar a plataforma utilize o usuario: <b>convidado</b> e senha:{' '}
              <b>convidado</b>
            </Paragraph>

            <OpenLink
              href="https://dados.plataformaschwantes.org/s/public_reports/app/dashboards#/view/e4a73500-f3bb-11ec-8dc6-f1dfbc855017"
              target="_blank"
              rel="noreferrer"
            >
              Saber mais <img src={arrow} alt="Seta" />
            </OpenLink>
          </Grid>
        </Grid>
      </Box>
    </AboutContainer>
  );
}
