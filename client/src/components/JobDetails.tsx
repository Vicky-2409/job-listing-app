import React from 'react';
import { Job } from '../types/job';

interface JobDetailsProps {
  job: Job | null;
}

export default function JobDetails({ job }: JobDetailsProps) {
  if (!job) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-gray-500">Select a job to view details</p>
        </div>
      </div>
    );
  }

  // Calculate days ago from posted date
  const getDaysAgo = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
          <div className="flex items-center mt-1">
            <span className="text-gray-700">{job.company}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-700">{job.location}</span>
          </div>
        </div>
        
        <button 
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          onClick={() => window.open(job.job_link, '_blank')}
        >
          Quick Apply
        </button>
      </div>
      
      {/* Job metadata */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">Posted</div>
            <div className="text-sm font-medium">
              {job.postedDateTime ? `${getDaysAgo(job.postedDateTime)} days ago` : 'Recently'}
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Job Type</div>
            <div className="text-sm font-medium">{job.employment_type}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Experience</div>
            <div className="text-sm font-medium">
              {job.min_exp && job.max_exp ? `${job.min_exp}-${job.max_exp} years` : job.experience}
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Location</div>
            <div className="text-sm font-medium">{job.location}</div>
          </div>
          
          {job.salary && (
            <div>
              <div className="text-xs text-gray-500">Salary</div>
              <div className="text-sm font-medium">{job.salary}</div>
            </div>
          )}
          
          <div>
            <div className="text-xs text-gray-500">Source</div>
            <div className="text-sm font-medium">{job.source}</div>
          </div>
        </div>
      </div>
      
      {/* Qualifications */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Qualifications</h2>
        <div className="flex flex-wrap gap-2">
          {job.experience && (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded">
              {job.experience}
            </span>
          )}
          {job.seniority_level && (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded">
              {job.seniority_level}
            </span>
          )}
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded">
            {job.employment_type}
          </span>
        </div>
      </div>
      
      {/* Job Description */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Job Description</h2>
        <div className="text-gray-700 text-sm space-y-4">
          {job.description ? (
            <p>{job.description}</p>
          ) : (
            <>
              <p>This is a {job.employment_type} role for {job.title} at {job.company} located in {job.location}.</p>
              {job.experience && (
                <p>The ideal candidate should have {job.experience} of experience in the field.</p>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Footer with company link */}
      {job.company_url && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <a 
            href={job.company_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm hover:underline flex items-center"
          >
            Visit {job.company} website
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}