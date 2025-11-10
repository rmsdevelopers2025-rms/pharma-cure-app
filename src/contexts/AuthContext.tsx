import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { API_ENDPOINTS, getAuthHeaders, setAuthToken, removeAuthToken, getAuthToken } from '@/config/api';

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  session: { token: string } | null;
  signUp: (email: string, password: string, fullName: string, sex: string, age: number, height: number, weight: number, medicalInformation: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<{ token: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await fetch(API_ENDPOINTS.ME, {
            headers: getAuthHeaders(),
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setSession({ token });
          } else {
            removeAuthToken();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          removeAuthToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, sex: string, age: number, height: number, weight: number, medicalInformation: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName,
          sex,
          age,
          height,
          weight,
          medicalInformation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.error || 'Failed to sign up' } };
      }

      setAuthToken(data.token);
      setUser(data.user);
      setSession({ token: data.token });
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message || 'Network error' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.SIGNIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.error || 'Failed to sign in' } };
      }

      setAuthToken(data.token);
      setUser(data.user);
      setSession({ token: data.token });
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message || 'Network error' } };
    }
  };

  const signOut = async () => {
    removeAuthToken();
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
