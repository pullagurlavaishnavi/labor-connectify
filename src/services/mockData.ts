
import { JobRequest } from './jobRequestService';
import { Provider } from './providerService';
import { Quote } from './quoteService';

// Mock users data
export const users = [
  {
    id: 'user-1',
    email: 'user@example.com',
    first_name: 'John',
    last_name: 'Doe',
    phone: '9876543210',
    password: 'password123', // In a real app, passwords would be hashed
  },
  {
    id: 'user-2',
    email: 'provider@example.com',
    first_name: 'Jane',
    last_name: 'Smith',
    phone: '9876543211',
    password: 'password123',
  },
];

// Mock job requests data
export const jobRequests: JobRequest[] = [
  {
    id: 1,
    title: 'Need Welders for Factory Maintenance',
    location: 'Mumbai, Maharashtra',
    start_date: '2025-05-01',
    start_time: '09:00',
    hours_per_day: 8,
    number_of_days: 90,
    workers: 5,
    job_type: 'contract',
    description: 'Looking for experienced welders who can handle maintenance work in our manufacturing plant. The project involves repairing and maintaining various metal structures and equipment.',
    contact_info: 'contact@factory.com',
    user_id: 'user-1',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: 2,
    title: 'Skilled Fitters for Construction Project',
    location: 'Delhi, NCR',
    start_date: '2025-05-15',
    start_time: '08:00',
    hours_per_day: 10,
    number_of_days: 180,
    workers: 10,
    job_type: 'full-time',
    description: 'Hiring skilled fitters for our ongoing construction project. Candidates should have experience in fitting pipes, structures, and equipment in large construction sites.',
    contact_info: 'hr@construct.com',
    user_id: 'user-1',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: 3,
    title: 'Electrical Workers for Factory Setup',
    location: 'Bangalore, Karnataka',
    start_date: '2025-06-01',
    start_time: '07:00',
    hours_per_day: 9,
    number_of_days: 60,
    workers: 8,
    job_type: 'contract',
    description: 'We need electrical workers for setting up electrical systems in our new factory. Experience with industrial electrical systems is required.',
    contact_info: 'electrical@factory.com',
    user_id: 'user-2',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
  },
  {
    id: 4,
    title: 'Packers Needed for Warehouse',
    location: 'Chennai, Tamil Nadu',
    start_date: '2025-04-15',
    start_time: '10:00',
    hours_per_day: 6,
    number_of_days: 30,
    workers: 15,
    job_type: 'part-time',
    description: 'Looking for workers who can pack and prepare goods for shipping in our warehouse. Previous experience in a warehouse environment is preferred.',
    contact_info: 'warehouse@shipping.com',
    user_id: 'user-2',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
];

// Mock providers data
export const providers: Provider[] = [
  {
    id: 'user-2',
    user_id: 'user-2',
    company_name: 'Smith Industries',
    contact_person: 'Jane Smith',
    phone: '9876543211',
    email: 'provider@example.com',
    address: 'Industrial Area, Sector 5, Mumbai',
    specialization: ['welding', 'fitting', 'electrical'],
    years_in_business: 8,
    description: 'We are a leading industrial labor provider with expertise in welding, fitting, and electrical work. Our team consists of highly skilled professionals with years of experience in various industries.',
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), // 180 days ago
  },
];

// Mock quotes data
export const quotes: Quote[] = [
  {
    id: 1,
    job_request_id: 1,
    provider_id: 'user-2',
    amount: '₹22,000 per worker',
    comments: 'We can provide 5 experienced welders for your factory maintenance. All our workers have at least 5 years of experience and necessary certifications.',
    timeline: '3 months',
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 2,
    job_request_id: 2,
    provider_id: 'user-2',
    amount: '₹19,000 per worker',
    comments: 'We can supply 10 skilled fitters for your construction project. Our team has worked on similar projects before and can start immediately.',
    timeline: '6 months',
    status: 'accepted',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
  },
];

// Helper function to get formatted time difference for display
export const getTimeDifference = (timestamp: string) => {
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
