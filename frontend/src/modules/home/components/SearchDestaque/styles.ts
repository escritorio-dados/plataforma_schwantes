import { Box, Paper, styled, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

export const SearchDestaqueContainer = styled(Box)`
  background: #0d3362;
  padding: 5rem 0;

  display: flex;
  align-items: center;
`;

export const ImportantWorksContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  padding-bottom: 0.5rem;

  overflow: auto;

  min-height: 10rem;

  > div + div {
    margin-left: 1rem;
  }
`;

export const Work = styled(Paper)`
  width: 196px;
  min-width: 196px;
  height: 244px;

  border-radius: 5px;

  padding: 0.5rem 0.7rem;
  position: relative;

  > div.background {
    border-radius: 5px;
    background-color: #0d3362;
    opacity: 0.4;

    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const WorkTags = styled(Box)`
  display: flex;
  align-items: center;

  > p {
    z-index: 1;
    display: block;
    margin-right: 0.5rem;
    border-radius: 5px;
    padding: 2px 5px;
    font-size: 0.75rem;
    color: #fff;
  }
`;

export const WorkDesc = styled(Box)`
  padding: 0.3rem;

  > p {
    position: relative;
    z-index: 1;
    font-size: 0.75rem;
    color: #fff;
    text-align: center;
  }
`;

export const WorkLink = styled(Link)`
  border: 1px solid #fff;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  z-index: 2;

  font-weight: bold;
  font-size: 0.75rem;
  color: #fff;

  margin: 0.5rem 0;

  &:hover {
    background-color: #fff;
    color: #0d3362;
  }
`;

export const SearchInput = styled(TextField)`
  background-color: #fff;
  color: #df5a35;
  border-radius: 10px;

  margin-top: 2rem;

  & label.Mui-focused {
    color: #df5a35;
    background: #fff;
    padding: 3px;
    border-radius: 5px;
  }

  & label {
    color: #df5a35;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-radius: 10px;

      border-color: #df5a35;
    }

    fieldset {
      border-radius: 10px;

      border-color: #df5a35;
    }
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;

  margin-top: 0.5rem;
  padding-right: 1rem;
  display: block;
  width: 100%;
  text-align: right;

  color: #fff;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
