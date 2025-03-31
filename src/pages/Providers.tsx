
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2, Star, ThumbsUp, Clock, Shield } from 'lucide-react';

const Providers = () => {
  const { toast } = useToast();
  
  // Mock data for providers
  const providers = [
    {
      id: 1,
      name: "Skilled Force Solutions",
      specialty: ["Welders", "Fitters"],
      rating: 4.8,
      reviews: 124,
      completion: 98,
      experience: "7+ years",
      verified: true,
      description: "We provide highly skilled welders and fitters with extensive experience in manufacturing and industrial projects.",
    },
    {
      id: 2,
      name: "Industrial Labor Services",
      specialty: ["Welders", "Helpers", "Packing Operators"],
      rating: 4.5,
      reviews: 87,
      completion: 95,
      experience: "5+ years",
      verified: true,
      description: "Offering a range of skilled and semi-skilled labor for various industrial applications across multiple cities.",
    },
    {
      id: 3,
      name: "Expert Mechanical Labor",
      specialty: ["Fitters", "Helpers"],
      rating: 4.7,
      reviews: 56,
      completion: 100,
      experience: "10+ years",
      verified: true,
      description: "Specialists in providing expert fitters and helpers for precision mechanical work and industrial assembly.",
    },
    {
      id: 4,
      name: "United Workforce Solutions",
      specialty: ["Welders", "Fitters", "Helpers", "Packing Operators"],
      rating: 4.2,
      reviews: 42,
      completion: 92,
      experience: "3+ years",
      verified: true,
      description: "Complete labor solutions for all your industrial and manufacturing needs with workers across all categories.",
    }
  ];

  const handleContactProvider = (name: string) => {
    toast({
      title: "Request Sent",
      description: `Your query has been sent to ${name}. They will contact you shortly.`,
    });
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-blue-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Labor Providers</h1>
          <p className="text-gray-600 max-w-2xl">
            Browse verified labor agencies that can provide skilled workers for your business needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-white rounded-lg border">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Why Work with Verified Providers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Thoroughly Vetted</h3>
                <p className="text-gray-600 text-sm">All providers undergo a strict verification process.</p>
              </div>
            </div>
            <div className="flex items-start">
              <ThumbsUp className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Quality Assured</h3>
                <p className="text-gray-600 text-sm">Providers maintain high standards for their workers.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Secure Transactions</h3>
                <p className="text-gray-600 text-sm">Protected payment process and contractual agreements.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {providers.map(provider => (
            <Card key={provider.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-blue-700 flex items-center">
                      {provider.name}
                      {provider.verified && (
                        <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {provider.specialty.map(spec => (
                        <Badge key={spec} variant="outline" className="bg-blue-50">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({provider.reviews} reviews)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{provider.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <ThumbsUp className="h-5 w-5 mr-2 text-blue-500" />
                    <span>{provider.completion}% Completion Rate</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-blue-500" />
                    <span>{provider.experience} Experience</span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    View Profile
                  </Button>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleContactProvider(provider.name)}
                  >
                    Contact Provider
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Providers;
