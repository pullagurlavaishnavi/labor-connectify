
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, DollarSign, MapPin, Users } from 'lucide-react';
import { createJobRequest, getJobRequests, JobRequest } from '@/services/jobRequestService';
import { submitQuote } from '@/services/quoteService';

const JobRequests = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isProvider } = useAuth();
  const [activeTab, setActiveTab] = useState("browse");
  const [jobRequests, setJobRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  // Form state for posting a job request
  const [jobForm, setJobForm] = useState({
    title: '',
    jobType: '',
    workers: '',
    location: '',
    duration: '',
    budget: '',
    description: '',
    contactInfo: '',
  });

  // Form state for submitting a quote
  const [quoteForm, setQuoteForm] = useState({
    amount: '',
    timeline: '',
    comments: '',
  });
  const [quoteJobId, setQuoteJobId] = useState<number | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    fetchJobRequests();
  }, []);

  const fetchJobRequests = async () => {
    setLoading(true);
    try {
      const { data } = await getJobRequests();
      setJobRequests(data || []);
    } catch (error) {
      console.error('Error fetching job requests:', error);
      toast({
        title: "Error",
        description: "Failed to load job requests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setJobForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a job request.",
        variant: "destructive",
      });
      navigate('/sign-in');
      return;
    }

    try {
      setLoading(true);
      
      const jobRequest: Omit<JobRequest, 'id' | 'created_at'> = {
        title: jobForm.title,
        job_type: jobForm.jobType,
        workers: parseInt(jobForm.workers) || 1,
        location: jobForm.location,
        duration: jobForm.duration,
        budget: jobForm.budget,
        description: jobForm.description,
        contact_info: jobForm.contactInfo,
        user_id: user.id,
      };
      
      await createJobRequest(jobRequest);
      
      toast({
        title: "Job Request Submitted",
        description: "Your job request has been successfully posted.",
      });
      
      // Reset form
      setJobForm({
        title: '',
        jobType: '',
        workers: '',
        location: '',
        duration: '',
        budget: '',
        description: '',
        contactInfo: '',
      });
      
      // Switch to browse tab and refresh list
      setActiveTab("browse");
      fetchJobRequests();
      
    } catch (error) {
      console.error('Error submitting job request:', error);
      toast({
        title: "Error",
        description: "Failed to submit job request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setQuoteForm(prev => ({ ...prev, [id]: value }));
  };

  const openQuoteForm = (jobId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in as a provider to submit quotes.",
        variant: "destructive",
      });
      navigate('/sign-in');
      return;
    }

    if (!isProvider) {
      toast({
        title: "Provider Account Required",
        description: "Only providers can submit quotes. Please sign up as a provider.",
        variant: "destructive",
      });
      return;
    }

    setQuoteJobId(jobId);
    setShowQuoteForm(true);
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !quoteJobId) return;

    try {
      setLoading(true);
      
      await submitQuote({
        job_request_id: quoteJobId,
        provider_id: user.id,
        amount: quoteForm.amount,
        timeline: quoteForm.timeline,
        comments: quoteForm.comments,
      });
      
      toast({
        title: "Quote Submitted",
        description: "Your quote has been successfully submitted.",
      });
      
      // Reset form and close modal
      setQuoteForm({
        amount: '',
        timeline: '',
        comments: '',
      });
      setShowQuoteForm(false);
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Error",
        description: "Failed to submit quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter job requests based on search term and filters
  const filteredJobRequests = jobRequests.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesJobType = !jobTypeFilter || job.job_type === jobTypeFilter;
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesJobType && matchesLocation;
  });

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-blue-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Job Requests</h1>
          <div className="flex space-x-4">
            <Button 
              variant={activeTab === "browse" ? "default" : "outline"}
              onClick={() => setActiveTab("browse")}
              className={activeTab === "browse" ? "bg-blue-600" : ""}
            >
              Browse Requests
            </Button>
            <Button 
              variant={activeTab === "post" ? "default" : "outline"}
              onClick={() => setActiveTab("post")}
              className={activeTab === "post" ? "bg-blue-600" : ""}
            >
              Post a Request
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === "browse" ? (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Input 
                  type="search" 
                  placeholder="Search job requests..." 
                  className="w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="welder">Welder</SelectItem>
                    <SelectItem value="fitter">Fitter</SelectItem>
                    <SelectItem value="helper">Helper</SelectItem>
                    <SelectItem value="packer">Packing Operator</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              {loading ? (
                // Loading skeletons
                <>
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-48 w-full" />
                </>
              ) : filteredJobRequests.length > 0 ? (
                filteredJobRequests.map(job => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl text-blue-700">{job.title}</CardTitle>
                        <span className="text-sm text-gray-500">{job.postedDate}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-5 w-5 mr-2 text-blue-500" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-5 w-5 mr-2 text-blue-500" />
                          <span>{job.workers} workers</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                          <span>{job.budget}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{job.description}</p>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-sm text-gray-500">{job.quotes} quotes received</span>
                        <Button 
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={() => openQuoteForm(job.id)}
                        >
                          Submit Quote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No job requests found matching your criteria.</p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setJobTypeFilter('');
                    setLocationFilter('');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Post a New Job Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitJob} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Welders Needed for Manufacturing Project"
                      value={jobForm.title}
                      onChange={handleJobFormChange} 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type</Label>
                      <Select 
                        value={jobForm.jobType} 
                        onValueChange={(value) => handleSelectChange(value, 'jobType')}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welder">Welder</SelectItem>
                          <SelectItem value="fitter">Fitter</SelectItem>
                          <SelectItem value="helper">Helper</SelectItem>
                          <SelectItem value="packer">Packing Operator</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="workers">Number of Workers</Label>
                      <Input 
                        id="workers" 
                        type="number" 
                        min="1" 
                        placeholder="e.g., 5"
                        value={jobForm.workers}
                        onChange={handleJobFormChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        placeholder="e.g., Mumbai, Maharashtra"
                        value={jobForm.location}
                        onChange={handleJobFormChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input 
                        id="duration" 
                        placeholder="e.g., 3 months"
                        value={jobForm.duration}
                        onChange={handleJobFormChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range (per worker/month)</Label>
                    <Input 
                      id="budget" 
                      placeholder="e.g., ₹25,000 - ₹30,000"
                      value={jobForm.budget}
                      onChange={handleJobFormChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the job requirements, skills needed, and any other relevant details..."
                      rows={5}
                      value={jobForm.description}
                      onChange={handleJobFormChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactInfo">Contact Information</Label>
                    <Input 
                      id="contactInfo" 
                      placeholder="Phone number or email"
                      value={jobForm.contactInfo}
                      onChange={handleJobFormChange} 
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? "Posting..." : "Post Job Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Submit a Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Quote Amount</Label>
                  <Input 
                    id="amount" 
                    placeholder="e.g., ₹25,000 per worker/month"
                    value={quoteForm.amount}
                    onChange={handleQuoteFormChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input 
                    id="timeline" 
                    placeholder="e.g., Can start in 1 week, complete in 2 months"
                    value={quoteForm.timeline}
                    onChange={handleQuoteFormChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comments">Additional Comments</Label>
                  <Textarea 
                    id="comments" 
                    placeholder="Any additional information about your quote..."
                    rows={3}
                    value={quoteForm.comments}
                    onChange={handleQuoteFormChange}
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowQuoteForm(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Quote"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default JobRequests;
