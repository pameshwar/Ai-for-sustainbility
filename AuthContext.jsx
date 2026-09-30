import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facility, setFacility] = useState({
    name: 'Metropolis Tower One',
    type: 'Commercial Office',
    area: '75,000 sq ft'
  });

  useEffect(() => {
    // Check local storage for session or demo user
    const savedToken = localStorage.getItem('ecopulse_token');
    const savedUser = localStorage.getItem('ecopulse_user');

    if (savedToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser({ id: 'demo-facility-user', email: 'facility.manager@metropolistower.com', name: 'Alex Vance' });
      }
    } else {
      // Default to demo session for instant demonstration
      const demoUser = {
        id: 'demo-facility-user',
        email: 'facility.manager@metropolistower.com',
        name: 'Alex Vance (Chief Facility Engineer)',
        isDemo: true
      };
      localStorage.setItem('ecopulse_token', 'demo-token');
      localStorage.setItem('ecopulse_user', JSON.stringify(demoUser));
      setUser(demoUser);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setSession(session);
          setUser(session.user);
          localStorage.setItem('ecopulse_token', session.access_token);
          localStorage.setItem('ecopulse_user', JSON.stringify(session.user));
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setSession(session);
          setUser(session.user);
          localStorage.setItem('ecopulse_token', session.access_token);
          localStorage.setItem('ecopulse_user', JSON.stringify(session.user));
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const loginWithDemo = () => {
    const demoUser = {
      id: 'demo-facility-user',
      email: 'facility.manager@metropolistower.com',
      name: 'Alex Vance (Chief Facility Engineer)',
      isDemo: true
    };
    localStorage.setItem('ecopulse_token', 'demo-token');
    localStorage.setItem('ecopulse_user', JSON.stringify(demoUser));
    setUser(demoUser);
    return Promise.resolve(demoUser);
  };

  const loginWithSupabase = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      return loginWithDemo();
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    setSession(data.session);
    localStorage.setItem('ecopulse_token', data.session.access_token);
    localStorage.setItem('ecopulse_user', JSON.stringify(data.user));
    return data;
  };

  const signUpWithSupabase = async (email, password, metadata = {}) => {
    if (!isSupabaseConfigured || !supabase) {
      return loginWithDemo();
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata }
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('ecopulse_token');
    localStorage.removeItem('ecopulse_user');
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      facility,
      setFacility,
      loading,
      loginWithDemo,
      loginWithSupabase,
      signUpWithSupabase,
      logout,
      isSupabaseActive: isSupabaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
