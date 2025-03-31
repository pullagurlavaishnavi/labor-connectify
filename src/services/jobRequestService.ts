
import { supabase } from '@/lib/supabase';

export type JobRequest = {
  id?: number;
  title: string;
  location: string;
  duration: string;
  workers: number;
  budget: string;
  description: string;
  job_type: string;
  contact_info: string;
  user_id: string;
  created_at?: string;
};

export const createJobRequest = async (jobRequest: Omit<JobRequest, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('job_requests')
    .insert(jobRequest)
    .select();
  
  return { data, error };
};

export const getJobRequests = async () => {
  const { data, error } = await supabase
    .from('job_requests')
    .select('*, quotes(count)')
    .order('created_at', { ascending: false });
  
  return { 
    data: data?.map(job => ({
      ...job,
      quotes: job.quotes?.[0]?.count || 0,
      postedDate: `Posted ${getTimeDifference(job.created_at)}`
    })) || [], 
    error 
  };
};

export const getJobRequestsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('job_requests')
    .select('*, quotes(count)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { 
    data: data?.map(job => ({
      ...job,
      quotes: job.quotes?.[0]?.count || 0,
      postedDate: `Posted ${getTimeDifference(job.created_at)}`
    })) || [], 
    error 
  };
};

export const getJobRequestById = async (id: number) => {
  const { data, error } = await supabase
    .from('job_requests')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

// Helper function to format time
const getTimeDifference = (timestamp: string) => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'just now';
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
};
