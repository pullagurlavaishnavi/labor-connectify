
import { supabase } from '@/lib/supabase';

export type Provider = {
  id?: string;
  user_id: string;
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  specialization: string[];
  years_in_business: number;
  description: string;
  created_at?: string;
};

export const createProviderProfile = async (provider: Omit<Provider, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('providers')
    .insert({ ...provider, id: provider.user_id })
    .select();
  
  return { data, error };
};

export const getProviders = async () => {
  const { data, error } = await supabase
    .from('providers')
    .select('*');
  
  return { data, error };
};

export const getProviderById = async (id: string) => {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

export const updateProviderProfile = async (id: string, updates: Partial<Provider>) => {
  const { data, error } = await supabase
    .from('providers')
    .update(updates)
    .eq('id', id)
    .select();
  
  return { data, error };
};
