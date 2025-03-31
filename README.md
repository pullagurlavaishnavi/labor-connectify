
# LaborConnectify

A platform connecting labor providers with mechanical industries and MSMEs.

## Setting Up Supabase Connection

To connect this application to Supabase:

1. Create a Supabase account at [supabase.com](https://supabase.com) if you don't have one already
2. Create a new Supabase project
3. Set up the following environment variables in your deployment environment:
   - `VITE_SUPABASE_URL`: Your Supabase project URL (found in Project Settings > API)
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon/public key (found in Project Settings > API)

4. In your Supabase project, set up the following tables:

### Database Structure

#### providers
```sql
create table providers (
  id uuid primary key references auth.users(id),
  user_id uuid not null references auth.users(id),
  company_name text not null,
  contact_person text not null,
  phone text not null,
  email text not null,
  address text not null,
  specialization text[] not null,
  years_in_business integer not null,
  description text not null,
  created_at timestamp with time zone default now() not null
);
```

#### job_requests
```sql
create table job_requests (
  id bigint generated by default as identity primary key,
  title text not null,
  location text not null,
  duration text not null,
  workers integer not null,
  budget text not null,
  description text not null,
  job_type text not null,
  contact_info text not null,
  user_id uuid not null references auth.users(id),
  created_at timestamp with time zone default now() not null
);
```

#### quotes
```sql
create table quotes (
  id bigint generated by default as identity primary key,
  job_request_id bigint not null references job_requests(id),
  provider_id uuid not null references providers(id),
  amount text not null,
  comments text not null,
  timeline text not null,
  status text not null check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamp with time zone default now() not null
);
```

5. Set up Row Level Security (RLS) policies for these tables to control access.
6. Enable authentication in your Supabase project.

## Quick Start for Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server: `npm run dev`

## Deployment

1. Set the environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your deployment environment.
2. Build the project: `npm run build`
3. Deploy the build files from the `dist` directory to your hosting provider.

## Features

- User authentication for clients and labor providers
- Post job requests with detailed specifications
- Browse available job requests
- Submit quotes for available jobs
- Provider profiles with specialization and experience details
