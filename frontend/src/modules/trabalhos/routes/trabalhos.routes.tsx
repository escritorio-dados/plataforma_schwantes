import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from '#shared/routes/private';

import { InfoPublication } from '#modules/trabalhos/pages/InfoPublication';

import { CreatePublication } from '../pages/CreatePublication';

export function TrabalhosRoutes() {
  return (
    <Routes>
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreatePublication />
          </PrivateRoute>
        }
      />

      <Route path=":id" element={<InfoPublication />} />
    </Routes>
  );
}
