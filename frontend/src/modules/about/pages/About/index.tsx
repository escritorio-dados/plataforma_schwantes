import { Typography } from '@mui/material';

import { ContainerStyled } from '#shared/styles/container';

import { Divider, LinkText, Paragraph } from './styles';

export function About() {
  return (
    <ContainerStyled maxWidth="lg">
      <Divider />

      <Typography sx={{ color: '#737373', fontWeight: 'bold', marginTop: '2rem' }}>
        Sobre
      </Typography>

      <Typography
        sx={{ color: '#737373', fontWeight: 'bold', marginTop: '2rem', marginBottom: '2rem' }}
      >
        O que é a Plataforma Schwantes e por que o adventismo como objeto de pesquisa
      </Typography>

      <Paragraph>
        A confissão adventista do sétimo dia está presente no Brasil há mais de 150 anos, possuindo
        cerca de 1.487.429 de adeptos no país de acordo com o último Censo do IBGE <b>[1]</b>.
      </Paragraph>

      <Paragraph>
        Com um conjunto peculiar de crenças distintivas – entre elas a observância do sábado como
        dia de guarda, a perspectiva escatológica da volta literal de Jesus Cristo, a adoção de
        códigos dietético-sanitários que enfocam um estilo de vida saudável, e o papel profético dos
        escritos da cofundadora da denominação, Ellen G. White – a tradição adventista representa um
        recorte singular do cenário evangélico no Brasil.
      </Paragraph>

      <Paragraph>
        Para além de suas crenças e igrejas, a inserção do adventismo no Brasil estende-se à área da
        saúde com hospitais e clínicas, à comunicação com editoras, gráficas, gravadoras, emissoras
        de rádio e TV e plataformas de streaming, ao setor alimentício através da produção de
        alimentos para regimes vegetarianos, e à educação, com algumas centenas de milhares de
        estudantes espalhados pelo Brasil em instituições que ofertam desde o ensino básico até o
        superior, incluindo aí regime de internato nos moldes de instituições confessionais
        norte-americanas.
      </Paragraph>

      <Paragraph>
        Além dessa diversificada malha de instituições e frentes de atuação, a confissão adventista
        do sétimo dia no Brasil também apresenta um rico universo simbólico-cultural por meio de
        suas produções midiático-religiosas, como cantores(as), corais e grupos musicais,
        apresentadores de TV e influencers, e até personagens fictícios para o público
        infanto-juvenil criados há mais de 70 anos.
      </Paragraph>

      <Paragraph>
        Essas são algumas das razões pelas quais o adventismo é objeto de investigação em estudos
        nos programas de mestrado e doutorado brasileiros, que ultrapassam os limites da teologia e
        da ciência da religião, fazendo-se presentes em áreas como enfermagem, administração,
        psicologia, saúde coletiva, arquitetura, música, direito, engenharia de sistemas
        computacionais, entre outras.
      </Paragraph>

      <Paragraph>
        Diante disso, com esta base de indexação espera-se contribuir com a sistematização,
        organização e análise da produção de conhecimento relacionado à tradição adventista, cujo
        resultado seja a construção de um estado da arte do adventismo na academia brasileira, bem
        como a consolidação do campo de “estudos do adventismo” (em inglês, “Adventist Studies”){' '}
        <b>[2]</b>.
      </Paragraph>

      <Paragraph>
        A Plataforma Schwantes é, portanto, um serviço de indexação online que fornece apoio à
        pesquisa e a formação de uma comunidade que compartilha trabalhos científicos com temas
        diversos voltados para a tradição adventista no Brasil.
      </Paragraph>

      <Typography
        sx={{ color: '#737373', fontWeight: 'bold', marginTop: '2rem', marginBottom: '2rem' }}
      >
        Como foi criada a Plataforma Schwantes
      </Typography>

      <Paragraph>
        A gênese da Plataforma Schwantes remonta à 2013, ocasião em que o professor Allan Novaes
        idealizou e coordenou um levantamento preliminar de dissertações e teses sobre o adventismo
        feito pelos alunos da disciplina “Monografia I” da pós-graduação lato sensu em Teologia
        Bíblica do Centro Universitário Adventista de São Paulo (Unasp). A ideia era criar um acervo
        com estudos sobre o adventismo por meio da coleta de trabalhos acadêmicos em programas
        stricto sensu reconhecidos pela Capes.
      </Paragraph>

      <Paragraph>
        No ano seguinte, os dados coletados foram repassados aos então alunos do bacharelado em
        Teologia da mesma instituição – Leonardo Gubert e Ricardo Santana – que ampliaram o
        levantamento, em projeto de iniciação científica sob a supervisão do professor Rodrigo
        Follis, também com colaboração do Dr. Allan Novaes.
      </Paragraph>

      <Paragraph>
        O resultado desse empreendimento foi a publicação, no início de 2016, do livro O adventismo
        na academia brasileira: um panorama do estado da arte (
        <LinkText
          target="_blank"
          href="https://digital.unaspress.com.br/ebook/o-adventismo-na-academia-brasileira/"
        >
          link
        </LinkText>
        ) organizado pelos doutores Allan Novaes e Rodrigo Follis, lançado pela Unaspress, editoria
        universitária do Unasp. Na obra, o levantamento consistiu em 106 dissertações e teses que
        tinham como objeto de investigação a confissão adventista defendidas entre 1972 e 2013.
      </Paragraph>

      <Paragraph>
        No final de 2016, sob a orientação do Dr. Allan Novaes e do Pr. Bruno Ferreira, este último
        ligado à época ao Centro de Pesquisas Ellen G. White, Leonardo Gubert atualizou o
        levantamento feito no livro O adventismo na academia brasileira. Assim, Gubert apresentou os
        resultados da nova coleta em seu Trabalho de Conclusão de Curso, defendido na Faculdade de
        Teologia do Unasp com o título “Panorama dos trabalhos acadêmicos de stricto sensu sobre o
        adventismo de 1972-2015”.
      </Paragraph>

      <Paragraph>
        Esses dois trabalhos de 2016 foram ponto-de-partida teórico-metodológico para que, em 2018,
        a ideia de criar uma base de indexação digital com dissertações e teses sobre a tradição
        adventista se tornasse meta institucional. Isso ocorreu através da recém-criada Pró-reitoria
        de Pesquisa e Desenvolvimento Institucional no Unasp, liderada pelo Dr. Allan Novaes, também
        diretor do projeto.
      </Paragraph>

      <Paragraph>
        Em 2020 o Pr. Bruno Ferreira, coordenador do Escritório de Apoio à Gestão de Dados e
        Métricas do Unasp, assumiu a coordenação técnica do projeto de criação da base de indexação.
        Com a ajuda do teólogo e analista de dados Jamphier Geyser Carhuatanta Gómez, a metodologia
        foi redefinida e a coleta de dados, refinada, ampliando as bases de dados consultada. O
        trabalho sofreu paralisação decorrentes do cenário pandêmico global em 2020 e retomado no
        ano seguinte, quando o nome da base de indexação foi escolhido e votado no Conselho Superior
        Universitário como Plataforma Schwantes, em homenagem ao Dr. Julio Siegfried Schwantes (1915
        – 2008), cuja família, representada por sua filha Keila Schwantes, autorizou e agradeceu a
        homenagem.
      </Paragraph>

      <Paragraph>
        A Plataforma Schwantes foi lançada em 2022, com um acervo composto por 239 dissertações e
        teses defendidas entre 1972 e 2020 em universidades brasileiras. Ela está vinculada à
        Pró-reitoria de Pesquisa e Desenvolvimento Institucional do Unasp, mantida e atualizada por
        meio do Escritório de Apoio à Gestão de Dados e Métricas, e recebe suporte do Mestrado
        Profissional em Promoção da Saúde, Mestrado Profissional em Educação, Faculdade de Teologia
        e cursos de Comunicação Social do Unasp, especialmente através dos seguintes grupos de
        pesquisa: Reis, Excelsior, Thanos.
      </Paragraph>

      <Paragraph>
        São apoiadores da Plataforma Schwantes o Centro de Pesquisas Ellen G. White – Unasp, a
        Faculdade Adventista Paranaense (FAP), a Faculdade Adventista da Bahia (FADBA), a Faculdade
        Adventista da Amazônia (FAAMA) e a Faculdade Adventista de Minas Gerais (FADMINAS).
      </Paragraph>

      {/* <Typography
        sx={{ color: '#737373', fontWeight: 'bold', marginTop: '2rem', marginBottom: '2rem' }}
      >
        A metodologia por trás da Plataforma Schwantes
      </Typography> */}

      <Typography
        sx={{ color: '#737373', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}
      >
        Notas
      </Typography>

      <Paragraph>
        <b>[1]</b> Referência Sociologia e Adventismo <br />
        <b>[2]</b> PATRICK, Arthur. A brief, annotated introduction to the field of Adventist
        studies for higher degree students. Cooranbong: Avondale University, 2009.
      </Paragraph>
    </ContainerStyled>
  );
}
