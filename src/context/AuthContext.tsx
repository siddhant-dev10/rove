'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('rove_user');
        if (cached) return JSON.parse(cached);
      } catch {
        // Ignore JSON parse errors
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
          try {
            localStorage.setItem('rove_user', JSON.stringify(data.user));
          } catch {}
          return;
        }
      }
      // If server explicitly says unauthenticated
      if (res.status === 401) {
        setUser(null);
        try {
          localStorage.removeItem('rove_user');
        } catch {}
      }
    } catch {
      // Retain local session on network hiccup
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string, rememberMe: boolean = true) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setUser(data.user);
        try {
          localStorage.setItem('rove_user', JSON.stringify(data.user));
        } catch {}
        return { success: true };
      }
      return { success: false, error: data.error || 'Invalid credentials' };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setUser(data.user);
        try {
          localStorage.setItem('rove_user', JSON.stringify(data.user));
        } catch {}
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to create account' };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network failures on logout
    } finally {
      setUser(null);
      try {
        localStorage.removeItem('rove_user');
      } catch {}
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
