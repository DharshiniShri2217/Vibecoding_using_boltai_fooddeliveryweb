import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithPhone: (phone: string, password: string) => Promise<boolean>;
  signup: (fullName: string, emailOrPhone: string, password: string, district: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ALLOWED_DISTRICT = 'Madurai';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          email: foundUser.email,
          fullName: foundUser.fullName,
          district: foundUser.district
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.phone === phone && u.password === password);

      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          phone: foundUser.phone,
          fullName: foundUser.fullName,
          district: foundUser.district
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    fullName: string,
    emailOrPhone: string,
    password: string,
    district: string
  ): Promise<boolean> => {
    if (district !== ALLOWED_DISTRICT) {
      return false;
    }

    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const isEmail = emailOrPhone.includes('@');

      const newUser = {
        id: crypto.randomUUID(),
        ...(isEmail ? { email: emailOrPhone } : { phone: emailOrPhone }),
        fullName,
        district,
        password
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const userData: User = {
        id: newUser.id,
        ...(isEmail ? { email: newUser.email } : { phone: newUser.phone }),
        fullName: newUser.fullName,
        district: newUser.district
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithPhone, signup, logout, isLoading }}>
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

export const ALLOWED_DISTRICTS = [ALLOWED_DISTRICT];
