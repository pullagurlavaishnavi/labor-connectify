
import { providers } from './mockData';

export type Provider = {
  id?: string;
  user_id: string;
  company_name: string;
  contact_person?: string;
  phone: string;
  email: string;
  address: string;
  specialization: string[];
  years_in_business: number;
  description: string;
  created_at?: string;
};

export const createProviderProfile = async (provider: Omit<Provider, 'id' | 'created_at'>) => {
  const newProvider = { 
    ...provider, 
    id: provider.user_id, 
    created_at: new Date().toISOString() 
  };
  
  providers.push(newProvider);
  
  return { data: [newProvider], error: null };
};

export const getProviders = async () => {
  return { data: providers, error: null };
};

export const getProviderById = async (id: string) => {
  const provider = providers.find(provider => provider.id === id);
  
  if (!provider) {
    return { data: null, error: { message: 'Provider not found' } };
  }
  
  return { data: provider, error: null };
};

export const updateProviderProfile = async (id: string, updates: Partial<Provider>) => {
  const providerIndex = providers.findIndex(provider => provider.id === id);
  
  if (providerIndex === -1) {
    return { data: null, error: { message: 'Provider not found' } };
  }
  
  const updatedProvider = {
    ...providers[providerIndex],
    ...updates,
  };
  
  providers[providerIndex] = updatedProvider;
  
  return { data: [updatedProvider], error: null };
};
