import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import { Router } from '#shared/routes';

export function App() {
  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
