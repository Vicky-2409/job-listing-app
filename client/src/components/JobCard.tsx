import React from 'react';
import { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onSelect: (job: Job) => void;
}

export default function JobCard({ job, isSelected, onSelect }: JobCardProps) {
  // Calculate days ago from posted date
  const getDaysAgo = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div 
      className={`p-4 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50 border-l-4 border-l-transparent'
      }`}
      onClick={() => onSelect(job)}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{job.title}</h3>
        {job.companyImageUrl && (
          <img 
            src={job.companyImageUrl} 
            alt={job.company}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>
      
      <div className="text-sm text-gray-600 mt-1">
        {job.company}
        {job.location && (
          <span className="ml-1">• {job.location}</span>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
          {job.employment_type}
        </span>
        {job.experience && (
          <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
            {job.experience}
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div className="text-xs text-gray-500">
          {job.postedDateTime && `${getDaysAgo(job.postedDateTime)} days ago`}
        </div>
        
        <button 
          className="px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100"
          onClick={(e) => {
            e.stopPropagation();
            window.open(job.job_link, '_blank');
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}