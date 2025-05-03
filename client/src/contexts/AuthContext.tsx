import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest, ApiMethod } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
}

interface RegisterUserData {
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: RegisterUserData) => Promise<boolean>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest("GET", '/api/auth/current-user');
        // Parse the JSON response
        const userData = response ? await response.json() as User : null;
        setUser(userData);
        setIsLoading(false);
      } catch (err) {
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiRequest('POST', '/api/auth/login', { username, password });
      
      // Parse the JSON response
      const userData = response ? await response.json() as User : null;
      
      if (userData) {
        setUser(userData);
        setIsLoading(false);
        toast({
          title: 'Login successful',
          description: `Welcome back, ${userData.fullName}!`,
        });
      } else {
        throw new Error('Failed to get user data');
      }
      return true;
    } catch (err: any) {
      setUser(null);
      setIsLoading(false);
      setError(err.message || 'Invalid credentials');
      toast({
        title: 'Login failed',
        description: err.message || 'Invalid credentials',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiRequest('GET', '/api/auth/logout');
      if (response) {
        await response.json(); // Process response, even if we don't use the result
      }
      setUser(null);
      toast({
        title: 'Logout successful',
        description: 'You have been logged out.',
      });
    } catch (err: any) {
      toast({
        title: 'Logout failed',
        description: err.message || 'Failed to logout',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterUserData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiRequest('POST', '/api/auth/register', userData);
      
      // Parse the JSON response
      const registeredUser = response ? await response.json() as User : null;
      
      if (registeredUser) {
        setUser(registeredUser);
        setIsLoading(false);
        toast({
          title: 'Registration successful',
          description: `Welcome, ${registeredUser.fullName}!`,
        });
        return true;
      } else {
        throw new Error('Failed to register user');
      }
    } catch (err: any) {
      setUser(null);
      setIsLoading(false);
      setError(err.message || 'Registration failed');
      toast({
        title: 'Registration failed',
        description: err.message || 'Could not create account',
        variant: 'destructive',
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}