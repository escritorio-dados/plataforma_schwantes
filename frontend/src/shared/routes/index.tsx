import { Routes, Route } from 'react-router-dom';

import { Home } from '#shared/pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
