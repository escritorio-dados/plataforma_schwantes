import { Routes, Route } from 'react-router-dom';

import { Auth } from '#shared/pages/Auth';

import { Search } from '#modules/trabalhos/pages/Search';
import { TrabalhosRoutes } from '#modules/trabalhos/routes/trabalhos.routes';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />

      <Route path="/doc/*" element={<TrabalhosRoutes />} />

      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
