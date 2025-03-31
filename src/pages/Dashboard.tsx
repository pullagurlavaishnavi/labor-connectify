
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getJobRequestsByUser } from '@/services/jobRequestService';
import { getQuotesByProvider } from '@/services/quoteService';
import { Briefcase, FileText, Clock, User, Building, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard: React.FC = () => {
  const { user, isProvider } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [jobRequests, setJobRequests] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user) {
          if (isProvider) {
            // Provider dashboard data
            const { data: providedQuotes } = await getQuotesByProvider(user.id);
            setQuotes(providedQuotes || []);
          } else {
            // Customer dashboard data
            const { data: userJobRequests } = await getJobRequestsByUser(user.id);
            setJobRequests(userJobRequests || []);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isProvider]);

  const renderOverview = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      );
    }

    if (isProvider) {
      // Provider overview
      const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
      const acceptedQuotes = quotes.filter(q => q.status === 'accepted').length;
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Total Quotes</CardTitle>
              <FileText className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{quotes.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Quotes submitted</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Pending</CardTitle>
              <Clock className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pendingQuotes}</p>
              <p className="text-sm text-muted-foreground mt-1">Awaiting response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Accepted</CardTitle>
              <User className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{acceptedQuotes}</p>
              <p className="text-sm text-muted-foreground mt-1">Jobs awarded</p>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      // Customer overview
      const totalQuotesReceived = jobRequests.reduce((sum, job) => sum + job.quotes, 0);
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Job Requests</CardTitle>
              <Briefcase className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{jobRequests.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total posted</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Quotes</CardTitle>
              <FileText className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalQuotesReceived}</p>
              <p className="text-sm text-muted-foreground mt-1">Quotes received</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Active Jobs</CardTitle>
              <Building className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground mt-1">In progress</p>
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {user?.email}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            {isProvider ? (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/job-requests')}>
                Browse Job Requests
              </Button>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/job-requests')}>
                Post New Job Request
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {isProvider ? (
              <TabsTrigger value="my-quotes">My Quotes</TabsTrigger>
            ) : (
              <TabsTrigger value="my-requests">My Requests</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="overview">
            {renderOverview()}
          </TabsContent>
          
          <TabsContent value="my-requests">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : jobRequests.length > 0 ? (
              <div className="space-y-4">
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
                          <Clock className="h-5 w-5 mr-2 text-blue-500" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <User className="h-5 w-5 mr-2 text-blue-500" />
                          <span>{job.workers} workers</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                          <span>{job.budget}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FileText className="h-5 w-5 mr-2 text-blue-500" />
                          <span>{job.quotes} quotes</span>
                        </div>
                      </div>
                      <div className="flex justify-end pt-4 border-t">
                        <Button variant="outline" className="mr-2">View Quotes</Button>
                        <Button variant="outline" className="mr-2">Edit</Button>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Delete</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500 mb-4">You haven't posted any job requests yet.</p>
                  <Button onClick={() => navigate('/job-requests')}>
                    Post Your First Job Request
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="my-quotes">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : quotes.length > 0 ? (
              <div className="space-y-4">
                {quotes.map(quote => (
                  <Card key={quote.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl text-blue-700">
                          {quote.job_requests?.title || 'Job Request'}
                        </CardTitle>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          quote.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                          quote.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                          <span>Quote: {quote.amount}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-5 w-5 mr-2 text-blue-500" />
                          <span>Timeline: {quote.timeline}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{quote.comments}</p>
                      <div className="flex justify-end pt-4 border-t">
                        <Button variant="outline">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500 mb-4">You haven't submitted any quotes yet.</p>
                  <Button onClick={() => navigate('/job-requests')}>
                    Browse Job Requests
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
