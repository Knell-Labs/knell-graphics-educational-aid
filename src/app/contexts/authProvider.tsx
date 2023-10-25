'use client'
import React, { useContext, createContext, FC } from 'react';
import { AuthContextType } from '@/types/auth';

import { AuthProviderProps } from '@/types/auth'

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = async ({ session, children }) => {

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
