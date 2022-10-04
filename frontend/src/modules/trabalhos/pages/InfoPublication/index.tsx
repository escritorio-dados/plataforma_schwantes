import { ArrowBack } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from '#shared/components/Loading';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { CustomButtom } from '#shared/styles/common';
import { ContainerStyled } from '#shared/styles/container';
import { IPublication } from '#shared/types/backend/IPublication';

import { PublicationTags, MetadataInfo, Publication } from './styles';

export function InfoPublication() {
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    error: errorPublication,
    loading: loadingPublication,
    data: publication,
  } = useGet<IPublication>({ url: `/elastic/doc/${params.id}` });

  useEffect(() => {
    if (errorPublication) {
      toast({ message: errorPublication, severity: 'error' });
    }
  }, [errorPublication, toast]);

  if (loadingPublication) return <Loading loading={loadingPublication} />;

  if (!publication) return <div />;

  return (
    <ContainerStyled maxWidth="lg">
      <Publication>
        <Tooltip title="Voltar para a pesquisa" placement="right">
          <IconButton onClick={() => navigate(-1)} className="go-back">
            <ArrowBack fontSize="large" />
          </IconButton>
        </Tooltip>

        <header>
          <PublicationTags>
            <Typography component="span" className="ano">
              {publication.ano}
            </Typography>

            <Typography component="span" className="tipo">
              {publication.tipo_trabalho}
            </Typography>
          </PublicationTags>

          <div className="link">
            <CustomButtom
              variant="contained"
              onClick={() => window.open(publication.link, '_blank')}
              disabled={!publication.link}
            >
              Link para {publication.tipo_trabalho}
            </CustomButtom>
          </div>
        </header>

        <main>
          <Typography component="h2">{publication.titulo}</Typography>

          <section className="autor">
            <Typography component="h4">Autor</Typography>

            <Typography>{publication.autor.autor_full_name}</Typography>

            {publication.orientador.orientador_full_name && (
              <>
                <Typography component="h4">Orientador</Typography>

                <Typography>{publication.orientador.orientador_full_name}</Typography>
              </>
            )}
          </section>

          {publication.palavras_chave && (
            <section className="palavras-chave">
              <Typography component="h3">Palavras Chave</Typography>

              <div>
                {publication.palavras_chave.map((keyword) => (
                  <Typography component="span" key={keyword}>
                    {keyword}
                  </Typography>
                ))}
              </div>
            </section>
          )}

          <section className="resumo">
            <Typography component="h3">Resumo</Typography>

            <Typography>{publication.resumo || 'Sem Resumo'}</Typography>
          </section>

          <section className="detalhes">
            <Typography component="h3">Detalhes</Typography>

            <MetadataInfo>
              <Typography className="metadata">Programa</Typography>

              <Typography className="info">{publication.programa}</Typography>
            </MetadataInfo>

            <MetadataInfo>
              <Typography className="metadata">Campo</Typography>

              <Typography className="info">{publication.campo}</Typography>
            </MetadataInfo>

            <MetadataInfo>
              <Typography className="metadata">Instituição</Typography>

              <Typography className="info">{publication.instituicao}</Typography>
            </MetadataInfo>

            <MetadataInfo>
              <Typography className="metadata">Tipo de Instituição</Typography>

              <Typography className="info">{publication.tipo_instituicao}</Typography>
            </MetadataInfo>

            <MetadataInfo>
              <Typography className="metadata">Estado</Typography>

              <Typography className="info">{publication.estado}</Typography>
            </MetadataInfo>
          </section>
        </main>
      </Publication>
    </ContainerStyled>
  );
}
