
import { quotes, providers } from './mockData';

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
  const newId = Math.max(...quotes.map(q => q.id || 0)) + 1;
  const newQuote = { 
    ...quote, 
    id: newId, 
    status: 'pending' as const,
    created_at: new Date().toISOString() 
  };
  
  quotes.push(newQuote);
  
  return { data: [newQuote], error: null };
};

export const getQuotesByJobRequest = async (jobRequestId: number) => {
  const jobQuotes = quotes.filter(quote => quote.job_request_id === jobRequestId);
  
  // Add provider information to each quote
  const quotesWithProviders = jobQuotes.map(quote => {
    const provider = providers.find(p => p.id === quote.provider_id);
    return { ...quote, providers: provider };
  });
  
  return { data: quotesWithProviders, error: null };
};

export const getQuotesByProvider = async (providerId: string) => {
  const providerQuotes = quotes.filter(quote => quote.provider_id === providerId);
  
  // Here you would add job request info to quotes in a real app
  // This is mocked for simplicity
  const quotesWithJobs = providerQuotes.map(quote => ({
    ...quote,
    job_requests: { title: 'Mock Job Request' }
  }));
  
  return { data: quotesWithJobs, error: null };
};

export const updateQuoteStatus = async (quoteId: number, status: 'accepted' | 'rejected') => {
  const quoteIndex = quotes.findIndex(quote => quote.id === quoteId);
  
  if (quoteIndex === -1) {
    return { data: null, error: { message: 'Quote not found' } };
  }
  
  quotes[quoteIndex] = {
    ...quotes[quoteIndex],
    status
  };
  
  return { data: [quotes[quoteIndex]], error: null };
};
