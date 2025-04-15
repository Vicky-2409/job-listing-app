import React from 'react';
import { Job } from '../types/job';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
  selectedJobId: string | null;
  onSelectJob: (job: Job) => void;
  loading: boolean;
}

export default function JobList({ jobs, selectedJobId, onSelectJob, loading }: JobListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 p-4">
        No jobs found matching your criteria.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {jobs.map(job => (
        <JobCard 
          key={job._id}
          job={job}
          isSelected={selectedJobId === job._id}
          onSelect={onSelectJob}
        />
      ))}
    </div>
  );
}
