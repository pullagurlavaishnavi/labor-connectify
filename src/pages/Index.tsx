
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Clock, Users, Wrench, DollarSign, Shield, CheckCircle2 } from 'lucide-react';

const Index = () => {
  const services = [
    { 
      title: "Welders", 
      icon: <Wrench className="h-10 w-10 text-blue-500 mb-4" />,
      description: "Access skilled welders for various industrial applications." 
    },
    { 
      title: "Fitters", 
      icon: <Wrench className="h-10 w-10 text-blue-500 mb-4" />,
      description: "Connect with experienced fitters for precision assembly work." 
    },
    { 
      title: "Helpers", 
      icon: <Users className="h-10 w-10 text-blue-500 mb-4" />,
      description: "Find reliable helper staff to support your operations." 
    },
    { 
      title: "Packing Operators", 
      icon: <Briefcase className="h-10 w-10 text-blue-500 mb-4" />,
      description: "Hire efficient packing operators for your logistics needs." 
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Post Your Requirements",
      description: "Share your labor needs with detailed requirements and timeline."
    },
    {
      number: 2,
      title: "Receive Quotes",
      description: "Get multiple quotes from verified labor providers."
    },
    {
      number: 3,
      title: "Compare & Select",
      description: "Compare quotes based on rates, experience, and reviews."
    },
    {
      number: 4,
      title: "Hire With Confidence",
      description: "Select the best provider and get your job done."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connecting Businesses with Skilled Industrial Labor
            </h1>
            <p className="text-xl mb-8">
              Find qualified welders, fitters, helpers, and more for your mechanical industry and MSME needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Post a Job Request
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Become a Provider
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Services Available</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We connect you with skilled labor across multiple specializations for mechanical industries and MSMEs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="feature-card">
                <CardContent className="pt-6 text-center">
                  {service.icon}
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect with the right labor providers in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Get Started Today</Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose LaborConnectify</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're transforming how businesses connect with industrial labor providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">
                Quickly find qualified labor without spending days calling agencies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cost Effective</h3>
              <p className="text-gray-600">
                Compare quotes from multiple providers to find the best rates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">
                All labor agencies on our platform are vetted and verified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Skilled Labor?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Post your job requirement and start receiving quotes from qualified providers.
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">Post a Job Request Now</Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
