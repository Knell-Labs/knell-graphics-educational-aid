'use client'

import React, { useState, useEffect, useCallback, useContext, FunctionComponent } from 'react';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../supabase/database.types.ts'
import { AuthContextType, UserProfile } from '@/types/auth';

import { AuthContext } from './authContext.tsx'

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {


  const [ profile, setProfile ] = useState<UserProfile | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);
  const supabase = createClientComponentClient<Database>();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name
        `)
        .eq('id', profile?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error(error)
      // alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [profile, supabase])

  useEffect(() => {
    getProfile()
  }, [getProfile])

  return (
    <AuthContext.Provider value={{ profile, loading, getProfile }}>
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
