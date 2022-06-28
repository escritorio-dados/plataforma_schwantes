import { Search } from '@mui/icons-material';
import { Typography, InputAdornment, IconButton, Box, Grid } from '@mui/material';
// import { blue } from '@mui/material/colors';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import i10 from '#static/searchDestaques/i10.png';
import i11 from '#static/searchDestaques/i11.png';
import i12 from '#static/searchDestaques/i12.png';
import i13 from '#static/searchDestaques/i13.png';
import i14 from '#static/searchDestaques/i14.png';
import i15 from '#static/searchDestaques/i15.png';
import i2 from '#static/searchDestaques/i2.png';
import i3 from '#static/searchDestaques/i3.png';
import i4 from '#static/searchDestaques/i4.png';
import i5 from '#static/searchDestaques/i5.png';
import i6 from '#static/searchDestaques/i6.png';
import i7 from '#static/searchDestaques/i7.png';
import i8 from '#static/searchDestaques/i8.png';
import i9 from '#static/searchDestaques/i9.png';

// import { useGet } from '#shared/services/useAxios';
// import { IPublication } from '#shared/types/backend/IPublication';

import {
  SearchInput,
  ImportantWorksContainer,
  WorkTags,
  WorkDesc,
  WorkLink,
  Work,
  NavLink,
} from './styles';

type IDestaque = { id: string; image: string; ano: string; tipo_trabalho: string; titulo: string };

type IDestaqueList = {
  [key: string]: IDestaque;
};

function getRandomKey(keys: string[]) {
  return keys[Math.floor(Math.random() * keys.length)];
}

// type IImageConfig = { [key: string]: string };

export function SearchDestaque() {
  const [search, setSearch] = useState('');
  const [destaqueData, setDestaqueData] = useState<IDestaque[]>([]);

  const navigate = useNavigate();

  // const {
  //   error: destaqueError,
  //   loading: destaqueLoading,
  //   data: destaqueData,
  //   send: getNewDestaques,
  // } = useGet<IPublication[]>({ url: '/elastic/doc/random', config: { params: { quantity: 4 } } });

  const selectDestaques = useCallback(() => {
    const destaquesList: IDestaqueList = {
      '135': {
        id: '135',
        ano: '2020',
        tipo_trabalho: 'Dissertação',
        titulo: 'Estilo de vida e qualidade de vida de pastores em comunidade de fé',
        image: i2,
      },
      '111': {
        id: '111',
        ano: '2020',
        tipo_trabalho: 'Dissertação',
        titulo:
          '"Um roteiro seguro e certo, a elevar as almas jovens" : educação afetiva e sexual na Revista Mocidade (1958-1994)',
        image: i3,
      },
      '8': {
        id: '8',
        ano: '2020',
        tipo_trabalho: 'Tese',
        titulo: 'A hermenêutica adventista e o dilema da ordenação da mulher',
        image: i4,
      },
      '134': {
        id: '134',
        ano: '2020',
        tipo_trabalho: 'Dissertação',
        titulo:
          'DEPRESSÃO E DESESPERANÇA: REALIDADE DO PASTOR? Uma Análise sobre os Fatores que Podem Influenciar a Saúde Mental do Pastor',
        image: i5,
      },
      '207': {
        id: '207',
        ano: '2006',
        tipo_trabalho: 'Tese',
        titulo: 'História da educação superior adventista: Brasil 1969-1999',
        image: i6,
      },
      '7': {
        id: '7',
        ano: '2009',
        tipo_trabalho: 'Dissertação',
        titulo:
          'Desenvolvimento e avaliação de um método para ensino da glicóse baseado na montagem da via metabólica assistida por computador',
        image: i7,
      },
      '65': {
        id: '65',
        ano: '2007',
        tipo_trabalho: 'Dissertação',
        titulo: 'Narrativas no Ensino de Funções por Meio de Investigações Matemáticas',
        image: i8,
      },
      '45': {
        id: '45',
        ano: '2014',
        tipo_trabalho: 'Tese',
        titulo:
          'A Mensagem na Música: estudos da Teomusicologia sobre cânticos dos Adventistas do Sétimo Dia',
        image: i9,
      },
      '101': {
        id: '101',
        ano: '2007',
        tipo_trabalho: 'Dissertação',
        titulo:
          'Vereda da Salvação e Terra para Rose: interfaces entre a escritura documental no teatro e no cinema',
        image: i10,
      },
      '23': {
        id: '23',
        ano: '2012',
        tipo_trabalho: 'Dissertação',
        titulo:
          'Discriminação religiosa nas relações de emprego: formas de neutralização e reparação',
        image: i11,
      },
      '28': {
        id: '28',
        ano: '2007',
        tipo_trabalho: 'Dissertação',
        titulo:
          'Socialização midiatizada: o papel da televisão na recepção de adolescente de instituição de acolhimento',
        image: i12,
      },
      '33': {
        id: '33',
        ano: '2013',
        tipo_trabalho: 'Dissertação',
        titulo: 'Desempenho acústico de templos e igrejas: subsídios à normalização',
        image: i13,
      },
      '5': {
        id: '5',
        ano: '2008',
        tipo_trabalho: 'Tese',
        titulo:
          'Efeito da atividade física programada sobre a adiposidade corporal em escolares adolescentes.',
        image: i14,
      },
      '34': {
        id: '34',
        ano: '2010',
        tipo_trabalho: 'Dissertação',
        titulo: 'O envelhecimento e a religiosidade em um grupo de idosos adventistas',
        image: i15,
      },
    };

    const destaques = [];

    for (let i = 0; i < 4; i += 1) {
      const destaqueKey = getRandomKey(Object.keys(destaquesList));

      destaques.push({ ...destaquesList[destaqueKey] });

      delete destaquesList[destaqueKey];
    }

    setDestaqueData(destaques);
  }, []);

  useEffect(() => {
    selectDestaques();
  }, [selectDestaques]);

  useEffect(() => {
    const interval = setInterval(() => {
      // getNewDestaques();
      selectDestaques();
    }, 1000 * 60 * 3);

    // Limpar interval quando o componente desmontar
    return () => {
      clearInterval(interval);
    };
  }, [selectDestaques]);
  // }, [getNewDestaques]);

  const handleSearch = useCallback(() => {
    const params = createSearchParams({ search: encodeURI(search) });

    navigate({
      pathname: '/search',
      search: `?${params}`,
    });
  }, [navigate, search]);

  const destaqueInfo = useMemo(() => {
    if (!destaqueData) {
      return [];
    }

    // const imagesConfig: IImageConfig = {
    //   i2,
    //   i3,
    //   i4,
    //   i5,
    //   i6,
    //   i7,
    //   i8,
    //   i9,
    //   i10,
    //   i11,
    //   i12,
    //   i13,
    //   i14,
    //   i15,
    // };

    const data = destaqueData.map((work) => {
      // const imageKey = getRandomKey(Object.keys(imagesConfig));

      // const image = imagesConfig[imageKey];

      // delete imagesConfig[imageKey];

      const titleFixed =
        work.titulo.length > 150 ? `${work.titulo.substring(0, 150)}...` : work.titulo;

      return {
        ...work,
        titulo: titleFixed,
        // image,
      };
    });

    return data;
  }, [destaqueData]);

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

            <NavLink to="/search">Busca Avançada</NavLink>
          </Grid>

          <Grid item xs={12} sm={6} lg={7} xl={8}>
            <Typography sx={{ color: '#737373', fontSize: '0.75rem' }}>DESTAQUES</Typography>

            <ImportantWorksContainer>
              {
                // destaqueLoading ? (
                //   <CircularProgress sx={{ color: blue[700], marginLeft: '4rem' }} size={75} />
                // ) : destaqueError ? (
                //   <></>
                // ) : (
                destaqueInfo.map((work) => (
                  <Work sx={{ backgroundImage: `url(${work.image})` }} key={work.id}>
                    <Box className="background" />

                    <WorkTags>
                      <Typography className="ano">{work.ano}</Typography>

                      <Typography className="tipo">{work.tipo_trabalho}</Typography>
                    </WorkTags>

                    <WorkDesc>
                      <Box className="background" />

                      <Typography>{work.titulo}</Typography>
                    </WorkDesc>

                    <WorkLink to={`/doc/${work.id}`}>Saber Mais</WorkLink>
                  </Work>
                ))
              }
            </ImportantWorksContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
