
import { createClient } from '@supabase/supabase-js';

// Default development values - REPLACE THESE WITH YOUR ACTUAL VALUES IN PRODUCTION
const FALLBACK_SUPABASE_URL = 'https://your-project-id.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'your-anon-key';

// Try to get environment variables, fallback to development values if not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

// Check if using fallback values and warn in development
if (supabaseUrl === FALLBACK_SUPABASE_URL || supabaseAnonKey === FALLBACK_SUPABASE_ANON_KEY) {
  console.warn('Using fallback Supabase credentials. Please set up your own Supabase project for full functionality.');
  console.info('Follow the setup instructions in the README.md file to connect to your Supabase project.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helper functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};
