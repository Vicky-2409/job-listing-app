"use client"
import { NextPage } from 'next';
import Head from 'next/head';
import { useJobs } from '../hooks/useJobs';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';

const Home: NextPage = () => {
  const {
    jobs,
    selectedJob,
    loading,
    filters,
    sortBy,
    currentPage,
    totalPages,
    totalJobs,
    updateFilters,
    updateSort,
    selectJob,
    goToPage
  } = useJobs();

  const handleLocationSearch = (location: string) => {
    updateFilters({ ...filters, location });
  };

  return (
    <>
      <Head>
        <title>Job Listings | Find Your Next Career</title>
        <meta name="description" content="Browse and search for job listings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
            <div className="mt-3">
              <SearchBar onSearch={handleLocationSearch} />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <SortDropdown value={sortBy} onChange={updateSort} />
            <div className="text-sm text-gray-600">
              Showing {jobs.length > 0 ? (currentPage - 1) * 10 + 1 : 0}-
              {Math.min(currentPage * 10, totalJobs)} of {totalJobs} jobs
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left sidebar with filters - fixed position */}
            <div className="md:col-span-3 md:sticky md:top-28 md:self-start">
              <FilterPanel 
                filters={filters} 
                onFilterChange={updateFilters} 
              />
            </div>
            
            {/* Middle column with job list - scrollable */}
            <div className="md:col-span-4">
              <div className="bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-150px)]">
                <div className="overflow-y-auto h-full">
                  <JobList 
                    jobs={jobs} 
                    selectedJobId={selectedJob?._id || null} 
                    onSelectJob={selectJob} 
                    loading={loading} 
                  />
                </div>
              </div>
              <div className="mt-4">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </div>
            </div>
            
            {/* Right column with job details */}
            <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
              <div className="bg-white shadow rounded-lg h-[calc(100vh-150px)] overflow-y-auto">
                <JobDetails job={selectedJob} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;