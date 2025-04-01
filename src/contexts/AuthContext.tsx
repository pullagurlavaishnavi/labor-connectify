import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  isProvider: boolean;
  setIsProvider: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProvider, setIsProvider] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser || null);
        
        if (currentUser) {
          const { data } = await supabase
            .from('providers')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
          
          setIsProvider(!!data);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Unable to sign in. Please try again.",
        variant: "destructive",
      });
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Your account has been successfully created. Please check your email for verification.",
      });
      
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "Unable to sign out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    isProvider,
    setIsProvider,
  };

  return (
    <AuthContext.Provider value={value}>
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
