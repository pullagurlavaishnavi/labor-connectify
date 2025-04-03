
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
import { X, Plus, Calendar } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

// Define the JobCategory type to structure the multiple categories with worker counts
type JobCategory = {
  category: string;
  count: number;
};

const JobPostingForm: React.FC = () => {
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([
    { category: '', count: 1 }
  ]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [numberOfDays, setNumberOfDays] = useState('1');
  const [hoursPerDay, setHoursPerDay] = useState('8');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState('09:00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCategoryChange = (value: string, index: number) => {
    const updatedCategories = [...jobCategories];
    updatedCategories[index].category = value;
    setJobCategories(updatedCategories);
  };

  const handleCountChange = (value: string, index: number) => {
    const updatedCategories = [...jobCategories];
    updatedCategories[index].count = parseInt(value, 10);
    setJobCategories(updatedCategories);
  };

  const addJobCategory = () => {
    setJobCategories([...jobCategories, { category: '', count: 1 }]);
  };

  const removeJobCategory = (index: number) => {
    if (jobCategories.length > 1) {
      const updatedCategories = jobCategories.filter((_, i) => i !== index);
      setJobCategories(updatedCategories);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all categories are selected
    const hasEmptyCategories = jobCategories.some(item => !item.category);
    
    if (hasEmptyCategories || !description || !location || !jobType || !startDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create a title that summarizes all requested categories
      const title = jobCategories
        .map(item => `${item.count} ${item.category}`)
        .join(", ");
      
      const { data, error } = await createJobRequest({ 
        title, 
        description,
        location,
        job_type: jobType,
        start_date: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
        start_time: startTime,
        hours_per_day: parseInt(hoursPerDay, 10),
        number_of_days: parseInt(numberOfDays, 10),
        workers: jobCategories.reduce((sum, item) => sum + item.count, 0),
        contact_info: user?.email || '',
        user_id: user?.id || '',
        categories: jobCategories,
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
          <div className="space-y-4">
            <Label>Job Categories</Label>
            {jobCategories.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1">
                  <Select
                    value={item.category}
                    onValueChange={(value) => handleCategoryChange(value, index)}
                    disabled={isSubmitting}
                    required
                  >
                    <SelectTrigger>
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
                <div className="w-36">
                  <Select
                    value={item.count.toString()}
                    onValueChange={(value) => handleCountChange(value, index)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Count" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} Worker{num > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeJobCategory(index)}
                  disabled={jobCategories.length === 1 || isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addJobCategory}
              disabled={isSubmitting}
              className="flex gap-1 items-center"
            >
              <Plus className="h-4 w-4" /> Add Another Category
            </Button>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="startDate"
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!startDate ? "text-muted-foreground" : ""}`}
                    disabled={isSubmitting}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Select
                value={startTime}
                onValueChange={setStartTime}
                disabled={isSubmitting}
              >
                <SelectTrigger id="startTime">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                      {hour.toString().padStart(2, '0')}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hoursPerDay">Hours Per Day</Label>
              <Select
                value={hoursPerDay}
                onValueChange={setHoursPerDay}
                disabled={isSubmitting}
              >
                <SelectTrigger id="hoursPerDay">
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(hours => (
                    <SelectItem key={hours} value={hours.toString()}>
                      {hours} {hours === 1 ? 'hour' : 'hours'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numberOfDays">Number of Days</Label>
              <Input
                id="numberOfDays"
                type="number"
                min="1"
                placeholder="Enter number of days"
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
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
