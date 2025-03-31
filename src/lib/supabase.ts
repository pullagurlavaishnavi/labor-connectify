
import { createClient } from '@supabase/supabase-js';

// Your actual Supabase URL
const supabaseUrl = 'https://wuqotqftogqjtjxyqmrb.supabase.co';
// Try to get environment variables, fallback to development values if not available
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Check if using fallback values and warn in development
if (supabaseAnonKey === 'your-anon-key') {
  console.warn('Using fallback Supabase credentials. Please set up your VITE_SUPABASE_ANON_KEY environment variable for full functionality.');
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
