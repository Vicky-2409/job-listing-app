import { useState, useEffect } from 'react';
import { Job, JobFilters, SortOption, JobsApiResponse } from '../types/job';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const pageSize = 10;

  useEffect(() => {
    fetchJobs();
  }, [filters, sortBy, currentPage]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage.toString());
      queryParams.append('pageSize', pageSize.toString());
      queryParams.append('sort', sortBy);
      
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.employment_type) queryParams.append('employmentType', filters.employment_type);
      if (filters.experience) queryParams.append('experience', filters.experience);
      if (filters.seniority_level) queryParams.append('seniorityLevel', filters.seniority_level);
      if (filters.company) queryParams.append('company', filters.company);
      
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(`${baseURL}/jobs?${queryParams.toString()}`);
      


      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data: JobsApiResponse = await response.json();
      console.log('API response:', data);
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setTotalJobs(data.totalCount);
      
      // Select the first job by default if no job is selected
      if (!selectedJob && data.jobs.length > 0) {
        setSelectedJob(data.jobs[0]);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: JobFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const updateSort = (option: SortOption) => {
    setSortBy(option);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const selectJob = (job: Job) => {
    setSelectedJob(job);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    jobs,
    selectedJob,
    loading,
    error,
    filters,
    sortBy,
    currentPage,
    totalPages,
    totalJobs,
    updateFilters,
    updateSort,
    selectJob,
    nextPage,
    prevPage,
    goToPage
  };
}