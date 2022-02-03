import { Routes, Route } from 'react-router-dom';

import { Home } from '#shared/pages/Home';

import { Search } from '#modules/trabalhos/pages/Search';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/search" element={<Search />} />
    </Routes>
  );
}
