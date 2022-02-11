import { isBefore, fromUnixTime } from 'date-fns';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { createContext, useCallback, useState, useContext, ReactNode } from 'react';

import { Loading } from '#shared/components/Loading';
import { usePost } from '#shared/services/useAxios';
import { IUser } from '#shared/types/backend/IUser';

import { useToast } from './toast';

type IAuthProviderProps = { children: ReactNode };

type IAuthResponse = { token: string; user: IUser };

type IAuthInput = { email: string; password: string };

type IAuthContextData = {
  user: IUser;
  logged: boolean;
  signIn(authInput: IAuthInput): Promise<void>;
  signOut(): Promise<void>;
};

type IAuthState = { token: string; user: IUser };

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@schwantes:token');
    const user = localStorage.getItem('@schwantes:user');

    if (token) {
      const decodedToken = jwt_decode<JwtPayload>(token);

      if (decodedToken && isBefore(fromUnixTime(Number(decodedToken.exp)), new Date())) {
        localStorage.removeItem('@schwantes:token');
        localStorage.removeItem('@schwantes:user');

        return {} as IAuthState;
      }
    }

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const { toast } = useToast();

  const { loading, send: auth } = usePost<IAuthResponse, IAuthInput>('/auth');

  const signIn = useCallback(
    async (authInput: IAuthInput) => {
      const { data: authData, error } = await auth(authInput);

      if (error) {
        toast({ message: error, severity: 'error' });

        return;
      }

      const { token, user } = authData as IAuthResponse;

      localStorage.setItem('@schwantes:token', token);
      localStorage.setItem('@schwantes:user', JSON.stringify(user));

      setData({ token, user });
    },
    [auth, toast],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem('@schwantes:token');
    localStorage.removeItem('@schwantes:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        logged: !!data.user,
        signIn,
        signOut,
      }}
    >
      <Loading loading={loading} />

      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
