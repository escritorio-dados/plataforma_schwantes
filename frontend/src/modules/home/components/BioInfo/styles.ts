import { Box, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const BioInfoContainer = styled(Box)`
  margin-top: 8rem;
  padding: 2rem;
  position: relative;

  > div.background {
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(214, 216, 224, 0.33);
  }
`;

export const Divider = styled(Box)`
  width: 20%;
  height: 5px;
  background: #e74040;
  margin-top: 1rem;
`;

export const Paragraph = styled(Typography)`
  margin-top: 1rem;
  text-align: justify;
  color: #737373;
  font-size: 14px;
`;

export const NavLink = styled(Link)`
  display: flex;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 0.75rem;

  margin-top: 1.5rem;

  color: #23a6f0;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
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

export const Image = styled(Box)`
  width: 170px;
  min-width: 170px;
  height: 236px;

  & + div {
    margin-left: 1rem;
  }

  border-radius: 5px;
  box-shadow: 0px 0.519481px 0.519481px rgba(0, 0, 0, 0.25),
    inset 0px 0.25974px 0px rgba(0, 0, 0, 0.1);

  > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;
