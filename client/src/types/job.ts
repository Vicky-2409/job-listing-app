export interface Job {
  _id: string; // MongoDB document ID
  title: string;
  company: string;
  location: string;
  job_link: string;
  employment_type: string;
  experience: string;
  source: string;
  country: string;
  postedDateTime: string;
  companyImageUrl: string;
  min_exp: number;
  max_exp: number;
  seniority_level?: string;
  company_url?: string;
  companytype?: string;
  description?: string;
  salary?: string;
}

export interface JobsApiResponse {
  jobs: Job[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface JobFilters {
  location?: string;
  employment_type?: string;
  experience?: string;
  company?: string;
  country?: string;
  source?: string;
  seniority_level?:string;
}

export type SortOption = "newest" | "oldest" | "relevance";
