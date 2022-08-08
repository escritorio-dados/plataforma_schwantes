import { Routes, Route } from 'react-router-dom';

import { Auth } from '#shared/pages/Auth';

import { About } from '#modules/about/pages/About';
import { Bio } from '#modules/bio/pages/Bio';
import { Home } from '#modules/home/pages/Home';
import { Search } from '#modules/trabalhos/pages/Search';
import { TrabalhosRoutes } from '#modules/trabalhos/routes/trabalhos.routes';
import { UsersRoutes } from '#modules/users/routes/users.routes';

import { PrivateRoute } from './private';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/bio" element={<Bio />} />

      <Route path="/about" element={<About />} />

      <Route path="/search" element={<Search />} />

      <Route path="/doc/*" element={<TrabalhosRoutes />} />

      <Route path="/auth" element={<Auth />} />

      <Route
        path="/users/*"
        element={
          <PrivateRoute>
            <UsersRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
