import { Box, Paper, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const BioInfoContainer = styled(Box)`
  margin-top: 8rem;
  padding: 2rem;
  position: relative;
  background: #df5a35;
`;

export const Paragraph = styled(Typography)`
  margin-top: 1rem;
  text-align: justify;
  color: #fff;
  font-size: 14px;
`;

export const NavLink = styled(Link)`
  display: flex;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 0.75rem;

  margin-top: 1.5rem;

  color: #fff;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  > img {
    margin-left: 0.4rem;
  }
`;

export const ImagesContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 4rem;

  padding-bottom: 0.5rem;

  overflow: auto;
`;

export const Image = styled(Paper)`
  width: 170px;
  min-width: 170px;
  height: 236px;

  & + div {
    margin-left: 1rem;
  }

  border-radius: 5px;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;
