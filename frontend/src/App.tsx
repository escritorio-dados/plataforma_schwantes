import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import { Navbar } from '#shared/components/Navbar';
import { AppProvider } from '#shared/hooks';
import { Router } from '#shared/routes';

export function App() {
  return (
    <>
      <CssBaseline />

      <AppProvider>
        <BrowserRouter>
          <Navbar />

          <Container sx={{ margin: '2em auto' }} maxWidth="xl">
            <Router />
          </Container>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}
