import { Container, createTheme, GlobalStyles, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from '#shared/components/Footer';
import { TopBar } from '#shared/components/TopBar';
import { AppProvider } from '#shared/hooks';
import { Router } from '#shared/routes';
import { cssGlobal } from '#shared/themes/global.styles';

const theme = createTheme({
  typography: {
    fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
    fontSize: 12,
  },
});

export function App() {
  return (
    <>
      <CssBaseline />

      <GlobalStyles styles={cssGlobal} />

      <ThemeProvider theme={theme}>
        <AppProvider>
          <BrowserRouter>
            <TopBar />

            <Container sx={{ margin: '0 auto', marginBottom: '2rem' }} maxWidth="xl">
              <Router />
            </Container>

            <Footer />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
