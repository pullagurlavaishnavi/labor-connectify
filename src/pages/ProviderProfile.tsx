
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { createProviderProfile, getProviderById, updateProviderProfile } from '@/services/providerService';

const specializations = [
  { id: 'welder', label: 'Welder' },
  { id: 'fitter', label: 'Fitter' },
  { id: 'helper', label: 'Helper' },
  { id: 'packer', label: 'Packing Operator' },
  { id: 'machinist', label: 'Machinist' },
  { id: 'electrician', label: 'Electrician' },
  { id: 'plumber', label: 'Plumber' },
  { id: 'carpenter', label: 'Carpenter' },
];

const ProviderProfile: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    phone: '',
    email: user?.email || '',
    address: '',
    specialization: [] as string[],
    years_in_business: 0,
    description: '',
  });

  useEffect(() => {
    const fetchProviderProfile = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data } = await getProviderById(user.id);
        
        if (data) {
          setFormData({
            company_name: data.company_name || '',
            contact_person: data.contact_person || '',
            phone: data.phone || '',
            email: data.email || user.email || '',
            address: data.address || '',
            specialization: data.specialization || [],
            years_in_business: data.years_in_business || 0,
            description: data.description || '',
          });
          setProfileExists(true);
        } else {
          setIsEditing(true);
        }
      } catch (error) {
        console.error('Error fetching provider profile:', error);
        setIsEditing(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviderProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSpecializationChange = (specializationId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specialization: checked
        ? [...prev.specialization, specializationId]
        : prev.specialization.filter(id => id !== specializationId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const profileData = {
        user_id: user.id,
        ...formData,
      };
      
      if (profileExists) {
        await updateProviderProfile(user.id, formData);
        toast({
          title: "Profile Updated",
          description: "Your provider profile has been successfully updated.",
        });
      } else {
        await createProviderProfile(profileData);
        setProfileExists(true);
        toast({
          title: "Profile Created",
          description: "Your provider profile has been successfully created.",
        });
      }
      
      setIsEditing(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving provider profile:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Provider Profile</CardTitle>
              <CardDescription>
                {profileExists 
                  ? "Update your provider profile information"
                  : "Complete your provider profile to start submitting quotes"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading profile information...</div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name</Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_person">Contact Person</Label>
                      <Input
                        id="contact_person"
                        name="contact_person"
                        value={formData.contact_person}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing || isLoading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Specializations</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      {specializations.map(spec => (
                        <div key={spec.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`spec-${spec.id}`}
                            checked={formData.specialization.includes(spec.id)}
                            onCheckedChange={(checked) => 
                              handleSpecializationChange(spec.id, checked as boolean)
                            }
                            disabled={!isEditing || isLoading}
                          />
                          <label
                            htmlFor={`spec-${spec.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {spec.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="years_in_business">Years in Business</Label>
                    <Input
                      id="years_in_business"
                      name="years_in_business"
                      type="number"
                      value={formData.years_in_business}
                      onChange={handleNumberChange}
                      disabled={!isEditing || isLoading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      disabled={!isEditing || isLoading}
                      required
                    />
                  </div>
                  
                  {isEditing ? (
                    <div className="flex justify-end space-x-3">
                      {profileExists && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? "Saving..." : "Save Profile"}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </form>
              )}
            </CardContent>
            {profileExists && !isEditing && (
              <CardFooter className="border-t pt-6 flex justify-between">
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderProfile;
