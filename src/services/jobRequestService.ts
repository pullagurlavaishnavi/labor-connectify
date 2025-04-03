
import { jobRequests, getTimeDifference } from './mockData';

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
  const newId = Math.max(...jobRequests.map(job => job.id || 0)) + 1;
  const newJobRequest = { 
    ...jobRequest, 
    id: newId, 
    created_at: new Date().toISOString() 
  };
  
  jobRequests.push(newJobRequest);
  
  return { data: [newJobRequest], error: null };
};

export const getJobRequests = async () => {
  // Add quotes count and format the date
  const formattedJobRequests = jobRequests.map(job => {
    const quoteCount = 2; // Mock quote count
    return {
      ...job,
      quotes: quoteCount,
      postedDate: `Posted ${getTimeDifference(job.created_at || '')}`
    };
  });
  
  return { data: formattedJobRequests, error: null };
};

export const getJobRequestsByUser = async (userId: string) => {
  const userJobs = jobRequests.filter(job => job.user_id === userId);
  
  const formattedUserJobs = userJobs.map(job => {
    const quoteCount = 1; // Mock quote count
    return {
      ...job,
      quotes: quoteCount,
      postedDate: `Posted ${getTimeDifference(job.created_at || '')}`
    };
  });
  
  return { data: formattedUserJobs, error: null };
};

export const getJobRequestById = async (id: number) => {
  const job = jobRequests.find(job => job.id === id);
  
  if (!job) {
    return { data: null, error: { message: 'Job request not found' } };
  }
  
  return { data: job, error: null };
};
