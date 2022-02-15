import { Routes, Route } from 'react-router-dom';

import { ListUsers } from '../pages/ListUsers';

export function UsersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListUsers />} />
    </Routes>
  );
}
