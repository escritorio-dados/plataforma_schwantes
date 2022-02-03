import { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

interface IAppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProviderProps) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
}
