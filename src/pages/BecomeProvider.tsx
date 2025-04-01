
import React from 'react';
import Layout from '@/components/Layout';
import ProviderSignupForm from '@/components/ProviderSignupForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const BecomeProvider: React.FC = () => {
  const { user, loading } = useAuth();

  // Redirect to sign-in if not logged in
  if (!loading && !user) {
    return <Navigate to="/sign-in" replace />;
  }

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
