
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getJobRequests } from '@/services/jobRequestService';
import { useNavigate } from 'react-router-dom';

export default function JobRequests() {
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['jobRequests'],
    queryFn: getJobRequests
  });

  // Extract job requests data from the response
  const jobRequests = data?.data || [];

  const filteredJobs = jobRequests.filter((job) => {
    const matchesJobType = jobTypeFilter === 'all' || job.job_type === jobTypeFilter;
    const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
    return matchesJobType && matchesLocation;
  });

  // Extract unique job types and locations
  const jobTypes = [...new Set(jobRequests.map((job) => job.job_type))];
  const locations = [...new Set(jobRequests.map((job) => job.location))];

  const clearFilters = () => {
    setJobTypeFilter('all');
    setLocationFilter('all');
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Available Job Requests</h1>
          <div className="flex space-x-4">
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Job Types</SelectItem>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={clearFilters}
              disabled={jobTypeFilter === 'all' && locationFilter === 'all'}
            >
              Clear Filters
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading job requests...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            Error loading job requests. Please try again.
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-8">
            No job requests found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.location} • {job.postedDate}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                      {job.job_type}
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold">
                      {job.quotes} {job.quotes === 1 ? 'Quote' : 'Quotes'}
                    </span>
                  </div>
                  <p className="text-gray-700 line-clamp-3">{job.description}</p>
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Duration: {job.duration}</span>
                      <span className="text-sm">Workers: {job.workers}</span>
                    </div>
                    <div className="mt-2">
                      <span className="font-semibold">Budget: {job.budget}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button 
                    className="w-full" 
                    onClick={() => navigate(`/job-requests/${job.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
