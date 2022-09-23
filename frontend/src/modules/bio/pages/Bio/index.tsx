import { Box, Grid, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import bio1 from '#static/bio/bio_1.png';
import bio2 from '#static/bio/bio_2.png';
import bio3 from '#static/bio/bio_3.png';
import bio4 from '#static/bio/bio_4.png';
import bio5 from '#static/bio/bio_5.png';

import { ContainerStyled } from '#shared/styles/container';

import { ClickableImage, Divider, LinkText, Paragraph } from './styles';

type IImageConfig = {
  [key: string]: {
    img: string;
    desc: string;
  };
};

const imagesConfig: IImageConfig = {
  '1': {
    img: bio1,
    desc: 'Siegfried Júilio Schwantes\nFoto cortesia do Centro Branco Brasileiro - UNASP.',
  },

  '2': {
    img: bio2,
    desc: 'Siegfried Júlio Schwantes e esposa Maria Nogueira Dias Schwantes\nFoto cortesia do Centro Branco Brasileiro - UNASP.',
  },

  '3': {
    img: bio3,
    desc: 'Siegfried Júlio Schwantes\nFoto cortesia do Brazilian White Center – UNASP.',
  },

  '4': {
    img: bio4,
    desc: 'Ernest Júlio Theodor Schwantes, avô de Siegfried Júlio Schwantes\nFoto cortesia do Brazilian White Center – UNASP',
  },

  '5': {
    img: bio5,
    desc: 'Siegfried Júlio Schwantes\nFoto cortesia do Brazilian White Center – UNASP.',
  },
};

export function Bio() {
  const [selectedImg, setSelectedImg] = useState('1');

  const anotherImages = useMemo(() => {
    return Object.entries(imagesConfig)
      .map(([key, value]) => ({
        ...value,
        id: key,
      }))
      .filter((img) => img.id !== selectedImg);
  }, [selectedImg]);

  return (
    <ContainerStyled maxWidth="lg">
      <Grid container spacing={6}>
        <Grid item xs={12} md={9}>
          <Divider />

          <Typography sx={{ color: '#737373', fontWeight: 'bold', marginTop: '2rem' }}>
            Biografia
          </Typography>

          <Typography sx={{ color: '#737373', fontWeight: 'bold', marginTop: '2rem' }}>
            História de Vida
          </Typography>

          <Paragraph>
            Nascido em Poços de Caldas - MG, Schwantes saiu de casa com 11 anos para dar mais ênfase
            aos estudos. Mudou-se para o estado de São Paulo, onde concluiu o ensino médio com 16
            anos, ao mesmo tempo em que obteve habilitação em Pedagogia pela Escola Normal Caetano
            de Campos.
          </Paragraph>

          <Paragraph>
            Seu amor pelo evangelho o levou a ingressar no Colégio Adventista Brasileiro (CAB, atual
            Unasp-SP) onde se graduou em Teologia em 1934. Com apenas 19 anos, sua jornada de
            estudos ultrapassou as fronteiras do Brasil, chegando aos Estados Unidos para iniciar um
            bacharelado em Física e Química no Emmanuel Missionary College (atual Universidade
            Andrews), curso que concluiu em 1938 no Pacific Union College, por conta da melhor
            estrutura oferecida para o estudo de ciências.
          </Paragraph>

          <Paragraph>
            Sentindo que estava pronto para passar seus conhecimentos adiante, Schwantes retornou ao
            Brasil e deu início à sua carreira como professor, lecionando Física, Química e
            Matemática no Colégio Adventista Brasileiro, onde permaneceu por cinco anos e onde
            casou-se com Maria Nogueira Dias, carinhosamente conhecida como Mariinha (in memoriam).
            A união dos dois gerou três belos frutos: Keila, Telma (1944-1953) e Ingrid.
          </Paragraph>

          <Paragraph>
            Em 1944 ele viu seu ministério acadêmico aflorar: foi convidado a ser diretor do
            Instituto Teológico Adventista (hoje Instituto Petropolitano Adventista de Ensino) em
            Petrópolis, Rio de Janeiro. Lá ele também deu aulas para o curso de Teologia até 1947.
            Mas a sede por conhecimento o levou de volta aos EUA, onde fez mestrado em Teologia
            Sistemática na Universidade de Potomac. Assim que recebeu o diploma, em 1949, ele foi
            lecionar Seminário Hispano-Americano no Novo México, local onde serviu como pastor pela
            primeira vez em uma igreja local.
          </Paragraph>

          <Paragraph>
            Seu conhecimento inestimável o tornava um acadêmico requisitado, por isso o professor
            Schwantes retornou ao Brasil em 1950 para lecionar no departamento de Teologia do
            Colégio Adventista Brasileiro.
          </Paragraph>

          <Paragraph>
            Após 14 anos de serviço à Igreja Adventista, em janeiro de 1953, ele foi ordenado ao
            ministério pastoral, e tornou-se pastor da Igreja do Colégio Adventista Brasileiro, sem
            deixar suas aulas de lado.
          </Paragraph>

          <Paragraph>
            A paixão pela sala de aula despertou no pastor e professor a necessidade de aprimorar
            seus conhecimentos: ele retornou aos Estados Unidos para buscar o título de doutor.
          </Paragraph>

          <Paragraph>
            Se candidatou e foi aprovado no programa doutoral de duas prestigiadas universidades:
            Harvard e John Hopkins. Escolheu a segunda e, em 1962, obteve o título de doutor em
            Línguas Bíblicas e Antigo Testamento. Continuou nos EUA lecionando no curso de Teologia
            da Universidade Andrews até 1966, quando recebeu um chamado que desafiou sua
            estabilidade: ir para o Líbano dirigir o departamento de Teologia da Faculdade do
            Oriente Médio.
          </Paragraph>

          <Paragraph>
            Mas independente de posições promissoras que ele e a esposa ocupavam, quando Deus
            chamava, o pastor Schwantes e sua família prontamente respondiam. No Líbano ele dirigiu
            o departamento de Teologia por cinco anos. Durante este período, também teve a
            oportunidade de participar, como arqueólogo, na escavação de um sítio arqueológico na
            Jordânia.
          </Paragraph>

          <Paragraph>
            Em seguida, foi para a França servir como professor de Teologia em Collonges, onde
            trabalhou de 1972 a 1978. Após isso, seu próximo destino foi o México, mais
            especificamente a Universidade de Montemorelos, onde lecionou Teologia até 1980.
          </Paragraph>

          <Paragraph>
            Depois de 40 anos de dedicação à Educação Adventista, o pastor, professor, arqueólogo e
            escritor Siegfried Júlio Schwantes se aposentou, mas esteve longe de parar. Ao
            contrário: Depois de sua aposentadoria, o professor Schwantes terminou de escrever um
            dicionário de Hebraico-Português do Antigo Testamento, um feito pioneiro nessa língua, e
            ainda deu aula nos cursos de Teologia da Universidade Adventista da França (01 ano),
            Instituto Adventista de Ensino, hoje Unasp-SP (01 ano), Avondale University College, na
            Austrália (03 anos), Universidade Adventista da África Central (01 semestre).
          </Paragraph>

          <Paragraph>
            Além disso, em acordo com a direção do Instituto Adventista de Ensino, Siegfried
            lecionou nos primeiros semestres de cada ano acadêmico, até suas forças permitirem,
            parando de dar aulas em 1995. Siegfried Schwantes faleceu em 1º de julho de 2008, aos 92
            anos, em Silver Spring, Maryland, Estados Unidos.
          </Paragraph>

          <Paragraph>
            Além de falar 23 idiomas que incluíam dialetos e línguas mortas, ele foi autor de
            grandes títulos da literatura adventista, tais como: The Biblical Meaning of History [O
            Significado Bíblico da História]; The Final Battle: Armageddon [A Última Batalha:
            Armageddon]; Arqueologia; Professor Toda Vida; Mais Perto de Deus (meditação CPB 1991).
            Além disso, ele traduziu os livros Parábolas de Jesus, de Ellen G. White, e Milton
            Afonso: vida e obras.
          </Paragraph>

          <Paragraph>
            Seu ministério acadêmico durou mais de 50 anos e há ainda feitos em sua história que
            podem ser consultados na biografia completa, clicando{' '}
            <LinkText
              href="https://encyclopedia.adventist.org/article?id=DGOP&lang=pt"
              target="_blank"
            >
              aqui
            </LinkText>
            .
          </Paragraph>
        </Grid>

        <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ marginTop: '7rem' }}>
            <img src={imagesConfig[selectedImg].img} alt="Schwantes" width="100%" />

            <Paragraph whiteSpace="pre-wrap" sx={{ marginTop: '0rem' }}>
              {imagesConfig[selectedImg].desc}
            </Paragraph>

            <Divider sx={{ width: '20%', marginTop: '0.5rem' }} />

            <Typography sx={{ color: '#737373', fontWeight: 'bold', marginTop: '0.5rem' }}>
              Mais Fotos
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: '0.5rem' }}>
              {anotherImages.map((img) => (
                <Grid item xs={4} key={img.id}>
                  <ClickableImage onClick={() => setSelectedImg(img.id)}>
                    <img src={img.img} alt="Schwantes" width="100%" height="100%" />
                  </ClickableImage>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ContainerStyled>
  );
}
