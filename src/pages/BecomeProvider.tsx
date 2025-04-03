
import React from 'react';
import Layout from '@/components/Layout';
import ProviderSignupForm from '@/components/ProviderSignupForm';

const BecomeProvider: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Become a Provider</h1>
        <ProviderSignupForm />
      </div>
    </Layout>
  );
};

export default BecomeProvider;
