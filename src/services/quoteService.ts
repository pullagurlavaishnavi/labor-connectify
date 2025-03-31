
import { supabase } from '@/lib/supabase';

export type Quote = {
  id?: number;
  job_request_id: number;
  provider_id: string;
  amount: string;
  comments: string;
  timeline: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at?: string;
};

export const submitQuote = async (quote: Omit<Quote, 'id' | 'created_at' | 'status'>) => {
  const { data, error } = await supabase
    .from('quotes')
    .insert({ ...quote, status: 'pending' })
    .select();
  
  return { data, error };
};

export const getQuotesByJobRequest = async (jobRequestId: number) => {
  const { data, error } = await supabase
    .from('quotes')
    .select('*, providers(*)')
    .eq('job_request_id', jobRequestId);
  
  return { data, error };
};

export const getQuotesByProvider = async (providerId: string) => {
  const { data, error } = await supabase
    .from('quotes')
    .select('*, job_requests(*)')
    .eq('provider_id', providerId);
  
  return { data, error };
};

export const updateQuoteStatus = async (quoteId: number, status: 'accepted' | 'rejected') => {
  const { data, error } = await supabase
    .from('quotes')
    .update({ status })
    .eq('id', quoteId)
    .select();
  
  return { data, error };
};
