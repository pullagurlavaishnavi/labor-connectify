
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Briefcase, Users, Building } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "1,200+", label: "Job Requests Posted", icon: <Briefcase className="h-8 w-8 text-blue-500" /> },
    { number: "350+", label: "Verified Providers", icon: <Users className="h-8 w-8 text-blue-500" /> },
    { number: "5,000+", label: "Workers Deployed", icon: <Users className="h-8 w-8 text-blue-500" /> },
    { number: "800+", label: "Business Clients", icon: <Building className="h-8 w-8 text-blue-500" /> },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">About LaborConnectify</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transforming how businesses connect with skilled industrial labor providers.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600">
              LaborConnectify was founded with a simple goal: to make it easier for businesses to find reliable, skilled workers for the mechanical and industrial sector.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Industrial workers" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <p className="text-gray-700">
                We recognized the challenges that businesses face when trying to source skilled labor for their operations. The traditional process was time-consuming, inefficient, and often led to mismatches between requirements and skills.
              </p>
              <p className="text-gray-700">
                Our platform bridges this gap by creating a marketplace where businesses can easily post their requirements and labor providers can submit competitive quotes, creating transparency and efficiency in the hiring process.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-gray-700">Simplify the labor hiring process</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-gray-700">Connect businesses with verified providers</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-gray-700">Ensure quality and reliability in industrial staffing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-blue-700 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality</h3>
              <p className="text-gray-600">
                We ensure that all labor providers on our platform meet high standards of professionalism and skill.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Transparency</h3>
              <p className="text-gray-600">
                Clear communication and honest dealings are at the core of our platform's operations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Efficiency</h3>
              <p className="text-gray-600">
                We streamline the hiring process to save time and resources for both businesses and providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the LaborConnectify Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking for skilled labor or offering your services, LaborConnectify is the platform for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Post a Job Request
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Become a Provider
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
