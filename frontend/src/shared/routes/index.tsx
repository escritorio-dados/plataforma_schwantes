import { Routes, Route } from 'react-router-dom';

import { Auth } from '#shared/pages/Auth';

import { InfoPublication } from '#modules/trabalhos/pages/InfoPublication';
import { Search } from '#modules/trabalhos/pages/Search';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />

      <Route path="/doc/:id" element={<InfoPublication />} />

      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
