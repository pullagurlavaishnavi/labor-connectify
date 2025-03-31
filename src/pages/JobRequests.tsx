
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
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
import { Calendar, Clock, DollarSign, MapPin, Users } from 'lucide-react';

const JobRequests = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("browse");
  
  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Job Request Submitted",
      description: "Your job request has been successfully posted.",
    });
  };

  // Mock data for job listings
  const jobRequests = [
    {
      id: 1,
      title: "5 Welders Needed for Manufacturing Plant",
      location: "Mumbai, Maharashtra",
      duration: "2 months",
      workers: 5,
      budget: "₹25,000 - ₹30,000 per worker/month",
      description: "Looking for experienced welders for our manufacturing plant. Must have 3+ years of experience in industrial welding.",
      postedDate: "Posted 2 days ago",
      quotes: 4
    },
    {
      id: 2,
      title: "Urgently Required 3 Fitters for Automobile Factory",
      location: "Pune, Maharashtra",
      duration: "3 months",
      workers: 3,
      budget: "₹28,000 - ₹32,000 per worker/month",
      description: "Need skilled fitters for our automobile assembly line. Experience with precision fitting required.",
      postedDate: "Posted 1 day ago",
      quotes: 2
    },
    {
      id: 3,
      title: "10 Packing Operators for Export Shipment",
      location: "Chennai, Tamil Nadu",
      duration: "1 month",
      workers: 10,
      budget: "₹20,000 per worker/month",
      description: "Seeking packing operators for handling export shipments. Training will be provided.",
      postedDate: "Posted 3 days ago",
      quotes: 7
    },
    {
      id: 4,
      title: "Helpers for Workshop - 15 positions",
      location: "Ahmedabad, Gujarat",
      duration: "6 months",
      workers: 15,
      budget: "₹18,000 per worker/month",
      description: "Helpers needed for various tasks in a mechanical workshop. No prior experience required.",
      postedDate: "Posted 5 days ago",
      quotes: 12
    }
  ];

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
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welder">Welder</SelectItem>
                    <SelectItem value="fitter">Fitter</SelectItem>
                    <SelectItem value="helper">Helper</SelectItem>
                    <SelectItem value="packer">Packing Operator</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              {jobRequests.map(job => (
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
                      <Button className="bg-orange-500 hover:bg-orange-600">Submit Quote</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                    <Input id="title" placeholder="e.g., Welders Needed for Manufacturing Project" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type</Label>
                      <Select required>
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
                      <Input id="workers" type="number" min="1" placeholder="e.g., 5" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., Mumbai, Maharashtra" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" placeholder="e.g., 3 months" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range (per worker/month)</Label>
                    <Input id="budget" placeholder="e.g., ₹25,000 - ₹30,000" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the job requirements, skills needed, and any other relevant details..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactInfo">Contact Information</Label>
                    <Input id="contactInfo" placeholder="Phone number or email" required />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Post Job Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobRequests;
