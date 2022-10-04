import { Container } from '@mui/material';

import { Navbar } from '../Navbar';
import { TopBarContainer } from './styles';

export function TopBar() {
  return (
    <TopBarContainer>
      <Container sx={{ margin: '0 auto' }} maxWidth="xl">
        <Navbar />
      </Container>
    </TopBarContainer>
  );
}
