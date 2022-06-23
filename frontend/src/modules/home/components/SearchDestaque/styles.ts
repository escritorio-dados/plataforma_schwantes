import { Box, styled, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

export const ImportantWorksContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  padding-bottom: 0.5rem;

  overflow: auto;
`;

export const Work = styled(Box)`
  width: 196px;
  min-width: 196px;
  height: 244px;
  margin-right: 2rem;

  border-radius: 5px;
  box-shadow: 0px 0.519481px 0.519481px rgba(0, 0, 0, 0.25),
    inset 0px 0.25974px 0px rgba(0, 0, 0, 0.1);

  padding: 0.5rem 0.7rem;
  position: relative;

  > div.background {
    border-radius: 5px;
    background-color: #b4aeae;
    opacity: 0.3;

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
  margin-bottom: 0.5rem;

  > p {
    z-index: 1;
    display: block;
    margin-right: 0.5rem;
    border-radius: 5px;
    padding: 2px 5px;
    font-size: 0.75rem;
    color: #fff;

    &.ano {
      background-color: #23a6f0;
    }

    &.tipo {
      background-color: #9f9e9e;
    }
  }
`;

export const WorkDesc = styled(Box)`
  padding: 0.3rem;
  position: relative;

  > div.background {
    background: #252d4b;
    border-radius: 2px;
    opacity: 0.6;

    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  > p {
    position: relative;
    z-index: 1;
    font-size: 0.75rem;
    color: #fff;
  }
`;

export const WorkLink = styled(Link)`
  z-index: 1;
  text-decoration: none;
  position: absolute;
  bottom: 8px;

  font-weight: bold;
  font-size: 0.75rem;
  color: #fff;
  border-bottom: 1px solid #00000000;

  &:hover {
    border-bottom: 1px solid #fff;
    border-radius: 0 0 3px 3px;
  }
`;

export const SearchInput = styled(TextField)`
  background-color: #23a6f0;
  border-radius: 10px;

  margin-top: 2rem;

  & label.Mui-focused {
    color: #fff;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #fff;
    }
  }
`;
