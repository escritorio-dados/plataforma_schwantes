import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from '#shared/components/Footer';
import { ScrollToTopButton } from '#shared/components/ScrollToTopButton';
import { TopBar } from '#shared/components/TopBar';
import { AppProvider } from '#shared/hooks';
import { Router } from '#shared/routes';
import { ScrollToTop } from '#shared/routes/scrollToTop';
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
            <ScrollToTop />

            <TopBar />

            <ScrollToTopButton />

            <Router />

            <Footer />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
