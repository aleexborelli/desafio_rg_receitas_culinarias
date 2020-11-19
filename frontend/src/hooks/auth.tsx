import React, { createContext, useContext, useState, useCallback } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  usuario: any;
}

interface SignUpCredentials {
  login: string;
  senha: string;
}

interface AuthContextData {
  token: string;
  usuario: any;
  signIn(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const usuario = localStorage.getItem('@RG_SISTEMAS/usuario');
    const token = localStorage.getItem('@RG_SISTEMAS/token');

    if (usuario && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        usuario: JSON.parse(usuario),
      };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ login, senha }) => {
    const response = await api.post('/sessions', { login, senha });

    const { usuario, token } = response.data;

    localStorage.setItem('@RG_SISTEMAS/usuario', JSON.stringify(usuario));
    localStorage.setItem('@RG_SISTEMAS/token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ usuario, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@RG_SISTEMAS/usuario');
    localStorage.removeItem('@RG_SISTEMAS/token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ usuario: data.usuario, signIn, signOut, token: data.token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
