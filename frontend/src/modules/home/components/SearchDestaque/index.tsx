import { Search } from '@mui/icons-material';
import { Typography, InputAdornment, IconButton, Box, Grid } from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import work2 from '#static/searchDestaques/work_2.png';
import work3 from '#static/searchDestaques/work_3.png';
import work4 from '#static/searchDestaques/work_4.png';
import work1 from '#static/searchDestaques/work_5.png';

import { SearchInput, ImportantWorksContainer, WorkTags, WorkDesc, WorkLink, Work } from './styles';

export function SearchDestaque() {
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    const params = createSearchParams({ search: encodeURI(search) });

    navigate({
      pathname: '/search',
      search: `?${params}`,
    });
  }, [navigate, search]);

  return (
    <>
      <Box sx={{ marginTop: '5rem' }}>
        <Grid container spacing={12}>
          <Grid item xs={12} sm={6} lg={5} xl={4} sx={{ color: '#fff' }}>
            <Typography fontSize="0.75rem">Bem-vindo à Plataforma Shwantes</Typography>

            <Typography
              component="h1"
              sx={{
                marginTop: '1rem',
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'justify',
                lineHeight: 1.2,
              }}
            >
              O maior repositório online para estudos sobre o adventismo no Brasil
            </Typography>

            <Typography fontSize="0.75rem" sx={{ marginTop: '1rem', textAlign: 'justify' }}>
              Uma nova maneira de pesquisar e acessar teses e dissertações que tiveram o Adventismo
              como objeto de pesquisa na academia brasileira. Explore o nosso acervo, conheça os
              trabalhos e dê continuidade ao exercício da ciência
            </Typography>

            <SearchInput
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              label="Insira o termo de sua busca"
              variant="outlined"
              InputLabelProps={{
                sx: { color: '#fff' },
              }}
              InputProps={{
                sx: { color: '#fff' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <Search sx={{ color: '#fff' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={7} xl={8}>
            <Typography sx={{ color: '#737373', fontSize: '0.75rem' }}>DESTAQUES</Typography>

            <ImportantWorksContainer>
              <Work sx={{ backgroundImage: `url(${work1})` }}>
                <Box className="background" />

                <WorkTags>
                  <Typography className="ano">2020</Typography>

                  <Typography className="tipo">Dissertação</Typography>
                </WorkTags>

                <WorkDesc>
                  <Box className="background" />

                  <Typography>
                    Estilo de vida e qualidade de vida de pastores em comunidade de fé
                  </Typography>
                </WorkDesc>

                <WorkLink to="/doc/135">Saber Mais</WorkLink>
              </Work>

              <Work sx={{ backgroundImage: `url(${work2})` }}>
                <Box className="background" />

                <WorkTags>
                  <Typography className="ano">2020</Typography>

                  <Typography className="tipo">Dissertação</Typography>
                </WorkTags>

                <WorkDesc>
                  <Box className="background" />

                  <Typography>
                    "Um roteiro seguro e certo, a elevar as almas jovens" : educação afetiva e
                    sexual na Revista Mocidade (1958-1994)
                  </Typography>
                </WorkDesc>

                <WorkLink to="/doc/111">Saber Mais</WorkLink>
              </Work>

              <Work sx={{ backgroundImage: `url(${work3})` }}>
                <Box className="background" />

                <WorkTags>
                  <Typography className="ano">2020</Typography>

                  <Typography className="tipo">Tese</Typography>
                </WorkTags>

                <WorkDesc>
                  <Box className="background" />

                  <Typography>
                    A hermenêutica adventista e o dilema da ordenação da mulher
                  </Typography>
                </WorkDesc>

                <WorkLink to="/doc/8">Saber Mais</WorkLink>
              </Work>

              <Work sx={{ backgroundImage: `url(${work4})` }}>
                <Box className="background" />

                <WorkTags>
                  <Typography className="ano">2020</Typography>

                  <Typography className="tipo">Dissertação</Typography>
                </WorkTags>

                <WorkDesc>
                  <Box className="background" />

                  <Typography>
                    DEPRESSÃO E DESESPERANÇA: REALIDADE DO PASTOR? Uma Análise sobre os Fatores que
                    Podem Influenciar a Saúde Mental do Pastor
                  </Typography>
                </WorkDesc>

                <WorkLink to="/doc/134">Saber Mais</WorkLink>
              </Work>
            </ImportantWorksContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
