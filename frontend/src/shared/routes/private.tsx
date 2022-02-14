import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '#shared/hooks/auth';
import { useToast } from '#shared/hooks/toast';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { logged } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!logged) {
      toast({
        message: 'Somente usuarios autenticados podem acessar essa página',
        severity: 'error',
      });
    }
  }, [logged, toast]);

  return logged ? children : <Navigate to="/auth" />;
}
