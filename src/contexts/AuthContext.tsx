
import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { users, providers } from '@/services/mockData';

type User = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, phone?: string) => Promise<any>;
  signOut: () => Promise<void>;
  isProvider: boolean;
  setIsProvider: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isProvider, setIsProvider] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Find user in our mock data
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Check if user is a provider
      const providerProfile = providers.find(p => p.user_id === foundUser.id);
      setIsProvider(!!providerProfile);
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
      return { data: { user: userWithoutPassword }, error: null };
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

  const handleSignUp = async (email: string, password: string, firstName?: string, lastName?: string, phone?: string) => {
    try {
      setLoading(true);
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: `user-${users.length + 1}`,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone,
      };
      
      // Add to users array (in a real app this would be saved to a database)
      users.push(newUser);
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
      
      return { data: { user: userWithoutPassword }, error: null };
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
      setUser(null);
      setIsProvider(false);
      
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
