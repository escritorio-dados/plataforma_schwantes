import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { Navbar } from '../Navbar';
import { TopBarContainer } from './styles';

export function TopBar() {
  const { pathname } = useLocation();

  if (pathname === '/') return <></>;

  return (
    <TopBarContainer>
      <Container sx={{ margin: '0 auto' }} maxWidth="xl">
        <Navbar />
      </Container>
    </TopBarContainer>
  );
}
