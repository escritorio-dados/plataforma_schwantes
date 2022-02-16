import { Routes, Route } from 'react-router-dom';

import { ChangePassword } from '../pages/ChangePassword';
import { ListUsers } from '../pages/ListUsers';

export function UsersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListUsers />} />

      <Route path="/password" element={<ChangePassword />} />
    </Routes>
  );
}
