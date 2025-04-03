
import React from 'react';
import Layout from '@/components/Layout';
import JobPostingForm from '@/components/JobPostingForm';

const PostJob: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Post a Job Request</h1>
        <JobPostingForm />
      </div>
    </Layout>
  );
};

export default PostJob;
