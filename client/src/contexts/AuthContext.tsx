
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User, AuthState } from '@/types';
import { authApi } from '@/services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      if (!state.token) {
        setState({ ...state, isLoading: false });
        return;
      }

      try {
        const user = await authApi.getCurrentUser();
        setState({
          ...state,
          isAuthenticated: true,
          user,
          isLoading: false,
        });
      } catch (error) {
        localStorage.removeItem('token');
        setState({
          ...state,
          token: null,
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: 'Authentication failed',
        });
      }
    };

    loadUser();
  }, [state.token]);

  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      const data = await authApi.login(email, password);
      localStorage.setItem('token', data.token);
      
      setState({
        ...state,
        token: data.token,
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast.success('Logged in successfully');
    } catch (error: any) {
      setState({
        ...state,
        isLoading: false,
        error: error.response?.data?.message || 'Login failed',
      });
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      const data = await authApi.register(name, email, password);
      localStorage.setItem('token', data.token);
      
      setState({
        ...state,
        token: data.token,
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast.success('Registered successfully');
    } catch (error: any) {
      setState({
        ...state,
        isLoading: false,
        error: error.response?.data?.message || 'Registration failed',
      });
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      error: null,
    });
    toast.info('Logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
