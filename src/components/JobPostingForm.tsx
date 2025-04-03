
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createJobRequest } from '@/services/jobRequestService';

const JobPostingForm: React.FC = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [budget, setBudget] = useState('25000');
  const [duration, setDuration] = useState('1 month');
  const [workers, setWorkers] = useState('5');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !description || !location || !jobType || !budget || !duration || !workers) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { data, error } = await createJobRequest({ 
        title: category, // Using the category as the title
        description,
        location,
        job_type: jobType,
        budget: `₹${budget}`,
        duration,
        workers: parseInt(workers),
        contact_info: user?.email || '',
        user_id: user?.id || '',
      });
        
      if (error) throw error;
      
      toast({
        title: "Job posted successfully",
        description: "Your job request has been posted. Providers can now submit quotes.",
      });
      
      navigate('/job-requests');
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast({
        title: "Failed to post job",
        description: error.message || "There was a problem posting your job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Post a Job Request</CardTitle>
        <CardDescription>
          Fill in the details below to post your job request and receive quotes from providers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Job Category</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              disabled={isSubmitting}
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select job category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welder">Welder</SelectItem>
                <SelectItem value="fitter">Fitter</SelectItem>
                <SelectItem value="tid-welder">TID Welder</SelectItem>
                <SelectItem value="mig-welder">MIG Welder</SelectItem>
                <SelectItem value="assembly-worker">Assembly Worker</SelectItem>
                <SelectItem value="packaging-worker">Packaging Worker</SelectItem>
                <SelectItem value="helper">Helper</SelectItem>
                <SelectItem value="welding-assistant">Welding Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe the job requirements, skills needed, and any other relevant details..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="e.g. Mumbai, Maharashtra" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type</Label>
            <Select
              value={jobType}
              onValueChange={setJobType}
              disabled={isSubmitting}
            >
              <SelectTrigger id="jobType">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="one-time">One-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                value={duration}
                onValueChange={setDuration}
                disabled={isSubmitting}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 week">1 Week</SelectItem>
                  <SelectItem value="2 weeks">2 Weeks</SelectItem>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="3 months">3 Months</SelectItem>
                  <SelectItem value="6 months">6 Months</SelectItem>
                  <SelectItem value="1 year">1 Year</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workers">Number of Workers</Label>
              <Select
                value={workers}
                onValueChange={setWorkers}
                disabled={isSubmitting}
              >
                <SelectTrigger id="workers">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Worker</SelectItem>
                  <SelectItem value="2">2 Workers</SelectItem>
                  <SelectItem value="5">5 Workers</SelectItem>
                  <SelectItem value="10">10 Workers</SelectItem>
                  <SelectItem value="15">15 Workers</SelectItem>
                  <SelectItem value="20">20 Workers</SelectItem>
                  <SelectItem value="25">25+ Workers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (₹)</Label>
            <Select
              value={budget}
              onValueChange={setBudget}
              disabled={isSubmitting}
            >
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10000">₹10,000</SelectItem>
                <SelectItem value="25000">₹25,000</SelectItem>
                <SelectItem value="50000">₹50,000</SelectItem>
                <SelectItem value="75000">₹75,000</SelectItem>
                <SelectItem value="100000">₹1,00,000</SelectItem>
                <SelectItem value="200000">₹2,00,000</SelectItem>
                <SelectItem value="500000">₹5,00,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Job Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;
