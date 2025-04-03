
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { createJobRequest } from '@/services/jobRequestService';
import { CalendarIcon } from 'lucide-react';

const JobPostingForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [workers, setWorkers] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !location || !jobType || !budget || !duration || !workers) {
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
        title,
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
            <Label htmlFor="title">Job Title</Label>
            <Input 
              id="title" 
              placeholder="e.g. Need Welders for Factory Maintenance" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
            />
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
              <Input 
                id="duration" 
                placeholder="e.g. 3 months" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workers">Number of Workers</Label>
              <Input 
                id="workers" 
                type="number"
                placeholder="e.g. 5" 
                value={workers}
                onChange={(e) => setWorkers(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (₹)</Label>
            <Input 
              id="budget" 
              placeholder="e.g. 25000" 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline (Optional)</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="deadline"
                  className={`w-full justify-start text-left font-normal ${!deadline ? "text-muted-foreground" : ""}`}
                  disabled={isSubmitting}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={(date) => {
                    setDeadline(date);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
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
