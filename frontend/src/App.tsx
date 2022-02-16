import { css } from '@emotion/react';
import { Container, GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from '#shared/components/Footer';
import { Navbar } from '#shared/components/Navbar';
import { AppProvider } from '#shared/hooks';
import { Router } from '#shared/routes';

export function App() {
  return (
    <>
      <CssBaseline />

      <GlobalStyles
        styles={css`
          #root {
            min-height: 100vh;
            position: relative;
            display: flex;
            flex-direction: column;
          }
        `}
      />

      <AppProvider>
        <BrowserRouter>
          <Navbar />

          <Container sx={{ margin: '2em auto' }} maxWidth="xl">
            <Router />
          </Container>

          <Footer />
        </BrowserRouter>
      </AppProvider>
    </>
  );
}
