
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Hammer, MapPin, Phone, Briefcase, Trophy } from 'lucide-react';

const ProviderSignupForm: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [services, setServices] = useState('');
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, setIsProvider } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const serviceOptions = [
    { id: "welding", label: "Welding" },
    { id: "fitting", label: "Fitting" },
    { id: "helpers", label: "General Labor/Helpers" },
    { id: "packing", label: "Packing Operations" },
    { id: "machining", label: "Machining" },
    { id: "electrical", label: "Electrical Work" },
  ];

  const handleServiceTypeChange = (checked: boolean, id: string) => {
    if (checked) {
      setServiceTypes([...serviceTypes, id]);
    } else {
      setServiceTypes(serviceTypes.filter(item => item !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName || !services || !experience || !address || !phone || !bio || serviceTypes.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select at least one service type.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { data, error } = await supabase
        .from('providers')
        .insert([
          { 
            user_id: user?.id,
            company_name: companyName,
            services,
            experience,
            address,
            phone,
            bio,
            service_types: serviceTypes,
            is_approved: false // Providers might need approval before they can submit quotes
          }
        ])
        .select();
        
      if (error) throw error;
      
      // Update user type to provider
      setIsProvider(true);
      
      toast({
        title: "Provider profile created",
        description: "Your provider profile has been created. You can now view and bid on job requests.",
      });
      
      navigate('/provider-profile');
    } catch (error: any) {
      console.error('Error creating provider profile:', error);
      toast({
        title: "Failed to create profile",
        description: error.message || "There was a problem creating your provider profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Become a Provider</CardTitle>
        <CardDescription>
          Complete your provider profile to start receiving job requests and submitting quotes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <Building2 size={18} />
              </span>
              <Input 
                id="companyName" 
                placeholder="Your company name" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="services">Services Offered</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <Hammer size={18} />
              </span>
              <Input 
                id="services" 
                placeholder="e.g. Welding, Fitting, Labor Supply" 
                value={services}
                onChange={(e) => setServices(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Service Types</Label>
            <div className="grid grid-cols-2 gap-2">
              {serviceOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`service-${option.id}`} 
                    checked={serviceTypes.includes(option.id)}
                    onCheckedChange={(checked) => handleServiceTypeChange(!!checked, option.id)}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor={`service-${option.id}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <Trophy size={18} />
              </span>
              <Input 
                id="experience" 
                placeholder="e.g. 5 years" 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <MapPin size={18} />
              </span>
              <Input 
                id="address" 
                placeholder="Your business address" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Business Phone</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <Phone size={18} />
              </span>
              <Input 
                id="phone" 
                placeholder="e.g. +91 9876543210" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Company Description</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell potential customers about your company, expertise, and what makes you stand out..." 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Profile..." : "Create Provider Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProviderSignupForm;
